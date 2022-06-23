const faunadb = require('faunadb')
const q = faunadb.query

export default async (req, res) => {
    const d = Number(req.query.d)
    try {
        const client = new faunadb.Client(
            { secret: process.env.SECRET }
        )
        const data = await client.query(

            // Query
            q.Map(
                q.Select(
                  "data",

                  q.Take(10, q.Drop(d, q.Paginate(q.Match("all_ref_ids_kas"), { size: 2000 })))

                ),
                q.Lambda("x", q.Select("data", q.Get(q.Ref(q.Collection("kas"), q.Var("x")))))
              )
            // End Of Query
        )

        res.status(200).json(data)

    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}