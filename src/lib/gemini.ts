import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai'

// Function to fetch data from the Express server with fallback
const fetchFromExpressServer = async (query: string) => {
  try {
    // Get the Express server URL from environment variables
    const EXPRESS_SERVER_URL = `${import.meta.env.VITE_SERVER_URL}/chat`

    // Skip server request if URL is not configured
    if (!EXPRESS_SERVER_URL) {
      console.warn('EXPRESS_SERVER_URL is not configured, skipping server request')
      return { fallback: true, reason: 'URL not configured' }
    }

    // Add a timeout to the fetch request
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    try {
      const response = await fetch(`${EXPRESS_SERVER_URL}?query=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Server did not return JSON:', contentType)
        return { fallback: true, reason: 'Non-JSON response' }
      }

      if (!response.ok) {
        return { fallback: true, reason: `HTTP error ${response.status}` }
      }

      const data = await response.json()
      return data
    } catch (fetchError: any) {
      console.error('Fetch error:', fetchError)
      return { fallback: true, reason: fetchError.message }
    }
  } catch (error) {
    console.error('Error in fetchFromExpressServer:', error)
    return { fallback: true, reason: 'Exception in fetch function' }
  }
}

export const getGeminiResponse = async (userMessage: string) => {
  try {
    // Initialize the Google Generative AI with your API key
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_AI_KEY || '')

    // For Gemini 1.5 Flash model
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
        }
      ]
    })

    // Try to get data from Express server, but don't worry if it fails
    const serverData = await fetchFromExpressServer(userMessage)

    // Create the chat history
    const chat = model.startChat({
      history: [],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800
      }
    })

    // Create the prompt for Gemini
    let prompt = userMessage

    // Only include server data if it was successfully retrieved
    if (serverData && !serverData.fallback) {
      console.log('Using data from server:', serverData)
      prompt = `
User query: ${userMessage}

Relevant data from database: ${JSON.stringify(serverData)}

Please provide a helpful response based on this information.
`
    } else {
      console.log('Using direct query without server data. Reason:', serverData?.reason || 'Unknown')
    }

    // Add system prompt
    const systemPrompt = `
You are Plus_House_Bot, a helpful assistant for a furniture company.
Always respond in Vietnamese unless specifically asked to use another language.
Be concise, friendly, and helpful.
If you don't know something, admit it rather than making up information.
If product has "priceDiscount" field, calculate the price by multiplying the "price" field by (1 - priceDiscount).
Do not multiply the price by 1000.
The price is in VND.
Do not include any disclaimers or unnecessary information.
Do not include any links in your response.
Do not include any code snippets in your response.
Use the "priceDiscount" field of products data to determine the percent discount.
Payment methods are: "Cash on delivery", "Zalo Pay", "Momo".
`

    // Send the message to the model
    const result = await chat.sendMessage(systemPrompt + '\n\n' + prompt)
    const response = await result.response
    const text = response.text()

    return { text }
  } catch (error) {
    console.error('Error getting Gemini response:', error)
    return {
      text: 'Xin lỗi, tôi không thể xử lý yêu cầu của bạn vào lúc này. Vui lòng thử lại sau.'
    }
  }
}
