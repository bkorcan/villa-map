const faunadb = require('faunadb')
const q = faunadb.query

export default async (req, res) => {
    // const d = Number(req.query.d)
    const SelectedDates = [q.Date("2022-08-14"),q.Date("2022-06-03")]
    try {
        const client = new faunadb.Client(
            { secret: process.env.SECRET }
        )
        const data = await client.query(

            // Query
            q.Filter(
                q.Map(
                  q.Select("data", q.Take(2, q.Paginate(q.Match("all_ref_ids_kas"), { size: 2000 }))),
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
                    q.LTE(q.Select("price", q.Var("x")), 9500),
                    q.LTE(q.Select("capacity", q.Var("x")), 3),
                    q.If(
                      q.ContainsValue(
                        true,
                        q.Map(
                            SelectedDates,
                          q.Lambda("y", q.ContainsValue(q.Var("y"), q.Select("dates", q.Var("x"))))
                        )
                      ),
                      false,
                      true
                    )
                  )
                )
              )
            // End Of Query
        )

        res.status(200).json(data)

    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}