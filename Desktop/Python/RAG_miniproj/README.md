# Automotive RAG Assistant

A Retrieval-Augmented Generation (RAG) system that provides intelligent answers about automotive topics using Wikipedia data and Google Gemini AI.

## Features

- 🤖 **AI-Powered Responses**: Uses Google Gemini AI for intelligent automotive Q&A
- 📚 **Wikipedia Integration**: Retrieves real-time information from Wikipedia
- 🚗 **Automotive Focus**: Specialized for car brands, models, and automotive technology
- 💬 **Interactive Chat**: Streamlit-based conversational interface
- ⚡ **Smart Caching**: Optimized performance with intelligent caching
- 🔍 **Query Normalization**: Handles various automotive company aliases

## Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Environment Configuration

Create a `.env` file in the project root:

```bash
# .env
GEMINI_API_KEY=your_gemini_api_key_here
```

**Get your Gemini API key:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `.env` file

### 3. Run the Application

```bash
streamlit run app.py
```

The application will be available at `http://localhost:8501`

## Usage

### Basic Queries
- "When was Tesla founded?"
- "Tell me about Toyota Prius"
- "What is the Ford Mustang history?"
- "BMW M3 specifications"

### Supported Automotive Brands
The system recognizes common aliases for major automotive brands:
- Tesla, BMW, Mercedes-Benz, Audi, Volkswagen
- Toyota, Honda, Ford, Chevrolet, Nissan
- Hyundai, Kia, Mazda, Subaru, Lexus
- And many more...

## Architecture

### Components

1. **`app.py`**: Main Streamlit application with UI
2. **`logic/wiki_utils.py`**: Wikipedia data retrieval and parsing
3. **`logic/gemini_utils.py`**: Google Gemini AI integration
4. **`logic/__init__.py`**: Module exports

### Key Features

- **Smart Caching**: Functions work both inside and outside Streamlit
- **Error Handling**: Comprehensive error handling and debugging
- **Query Normalization**: Handles automotive company aliases
- **Context Building**: Intelligent context construction from Wikipedia data
- **Debug Information**: Built-in debugging tools in the sidebar

## Troubleshooting

### Common Issues

1. **ImportError: cannot import name 'parse_infobox'**
   - ✅ **Fixed**: All imports are properly configured

2. **ModuleNotFoundError**
   - ✅ **Fixed**: All required packages are in `requirements.txt`
   - Run: `pip install -r requirements.txt`

3. **None returned from retrieve_wikipedia_data()**
   - ✅ **Fixed**: Functions work outside Streamlit context
   - Added fallback mechanisms

4. **Thread 'MainThread': missing ScriptRunContext!**
   - ✅ **Fixed**: Smart decorators detect Streamlit context

5. **Wikipedia retrieval issues**
   - ✅ **Fixed**: Added query normalization and multiple search attempts
   - Better error handling for API failures

6. **Gemini AI issues**
   - ✅ **Fixed**: Added API key validation and model testing
   - Comprehensive error handling

7. **Streamlit UI issues**
   - ✅ **Fixed**: Example buttons now properly trigger form submission
   - Session state management improved

8. **Caching issues**
   - ✅ **Fixed**: Smart caching with fallbacks
   - Performance optimizations added

### Debug Information

The application includes a debug panel in the sidebar that shows:
- Model status
- Environment variable status
- Cache status
- Real-time processing information

### Environment Variables

Required:
- `GEMINI_API_KEY`: Your Google Gemini API key

## Development

### Project Structure
```
RAG_miniproj/
├── app.py                 # Main Streamlit application
├── logic/
│   ├── __init__.py       # Module exports
│   ├── wiki_utils.py     # Wikipedia integration
│   └── gemini_utils.py   # Gemini AI integration
├── requirements.txt      # Python dependencies
├── Dockerfile           # Docker configuration
└── README.md           # This file
```

### Key Improvements Made

1. **Fixed Import Errors**: All module imports are properly configured
2. **Added Missing Dependencies**: `python-dotenv` added to requirements
3. **Streamlit Compatibility**: Functions work both inside and outside Streamlit
4. **Wikipedia API Improvements**: Better error handling and query normalization
5. **Gemini AI Enhancements**: API key validation and model testing
6. **UI/UX Fixes**: Example buttons work correctly
7. **Performance Optimizations**: Smart caching with fallbacks
8. **Debug Tools**: Comprehensive debugging information

## License

This project is for educational purposes. Please ensure you have proper API keys and follow the terms of service for all external services used.

## Support

If you encounter any issues:
1. Check the debug information in the sidebar
2. Verify your API key is correctly set
3. Ensure all dependencies are installed
4. Check the console for error messages
