const faunadb = require('faunadb')
const q = faunadb.query
import { range } from '../../components/range'

export default async (req, res) => {
  const ds = req.query.ds
  const de = req.query.de
  // console.log(ds, de)
  console.log(range(new Date(ds),new Date(de)))
  // const d = ["2022-05-14", "2022-05-04", "2022-05-24", "2022-05-17"]
    const d = range(new Date(ds),new Date(de))
  try {
    const client = new faunadb.Client(
      { secret: process.env.SECRET }
    )
    const data = await client.query(

      // Query
      q.Map(
      q.Filter(
        q.Map(
          q.Select("data", q.Take(5, q.Paginate(q.Match("all_ref_ids_kas"), { size: 2000 }))),
          q.Lambda("x", {
            price: q.Select(
              "amount",
              q.Select(
                "rate",
                q.Select(
                  "pricingQuote",
                  q.Select("data", q.Get(q.Ref(q.Collection("kas"), q.Var("x"))))
                )
              )
            ),
            res: q.Var("x"),
            capacity: q.Select(
              "personCapacity",
              q.Select("listing", q.Select("data", q.Get(q.Ref(q.Collection("kas"), q.Var("x")))))
            ),
            dates: q.Map(
              q.Select("date", q.Select("data", q.Get(q.Ref(q.Collection("kas"), q.Var("x"))))),
              q.Lambda("x", q.Select("date", q.Var("x")))
            )
          })
        ),
        q.Lambda(
          "x",
          q.And(
            q.LTE(q.Select("price", q.Var("x")), 60000),
            q.GTE(q.Select("price", q.Var("x")), 0),
            q.LTE(q.Select("capacity", q.Var("x")), 45),
            q.If(
              q.ContainsValue(
                true,
                q.Map(
                   q.Map(d, q.Lambda('x', q.Date(q.Var('x')) ) ),
                  q.Lambda("y", q.ContainsValue(q.Var("y"), q.Select("dates", q.Var("x"))))
                )
              ),
              false,
              true
            )
          )
        )
      )
       , q.Lambda('x', q.Select('data', q.Get(q.Ref(q.Collection("kas"), q.Select('res', q.Var('x'))))))
      )
      // End Of Query
    )

    res.status(200).json(data)

  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}