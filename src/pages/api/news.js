

export default async function handler(req, res) {

    const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&sortBy=popularity&page=1&pagesize=10&language=en&apiKey=c727a28d08b84681a92931c904b93a02`
    );

    res.status(200).json(response)
}