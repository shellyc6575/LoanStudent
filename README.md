Subgraph code  here: https://github.com/shellyc6575/LoanStudent/tree/main/Frontend/treasure


```

  const QueryURL = "https://api.studio.thegraph.com/query/67475/treasure/v0.0.2";

  const query = `
    {
        proposalCreateds(first: 3, orderBy: id) {
            destination
            description
            amount
            creator
          }
    }
  `
```

ABove query here: https://github.com/shellyc6575/LoanStudent/blob/main/Frontend/src/clubsproposal.jsx#L22


  ## Query 2

```
  const QueryURL = "https://api.studio.thegraph.com/query/67475/treasure/v0.0.2";

  const query = `
    {
     proposalVoteds(orderBy: id, first: 10) {
        vote
        voter
        clubId
        proposalId
      }
    }
  `;
```

ABove query here: https://github.com/shellyc6575/LoanStudent/blob/main/Frontend/src/voters.jsx#L21
