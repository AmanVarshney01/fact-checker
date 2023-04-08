const NEWS_API_KEY = process.env.NEWS_API_KEY;

export default async function handler(req, res) {

    const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&sortBy=popularity&page=1&pagesize=10&language=en&apiKey=${NEWS_API_KEY}`
    );


    res.status(200).json(response)
}