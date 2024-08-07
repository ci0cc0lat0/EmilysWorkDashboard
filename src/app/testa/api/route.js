export default async function handler(req, res){
    const {sort} = req.query
    let query = `/docx-tests?sort=createdAt:${sort}`
    
    const response = await fetch(`http://${process.env.API_IP}:1339/api/${query}`)
    const data = await response.json();

    res.status(200).json(data);
}