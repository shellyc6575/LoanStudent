// Endpoint for  olx Subgraph endpoints:
// Queries (HTTP):     https://api.studio.thegraph.com/query/54911/olx-marketplac/v0.0.1

import { useState, useEffect } from "react";
import { createClient } from "urql";


var proposalId = localStorage.getItem("proposalId");

const Memos = () => {



  const [tokens, setTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

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

  const client = createClient({
    url: QueryURL
  });

  useEffect(() => {
    if (!client) {
      return;
    }

    const getTokens = async () => {
      try {
        const { data } = await client.query(query).toPromise();
        setTokens(data.proposalVoteds);
        
        // console.log(data.proposalVoteds)
        setIsLoading(false); // Data is loaded
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getTokens();
  }, [client]);

  return (
    <>
      {isLoading ? (
        // Show loading indicator while data is being fetched
        <div>Loading...</div>
      ) : tokens.length > 0 ? (
        tokens.map((token, index) => (
          token.proposalId === proposalId && (
            <div key={index}>
                 Voter: {token.voter} ,  Vote: {token.vote.toString()}
            </div>
          )
        ))
      ) : (
        <div>No data available</div>
      )}
    </>
  );
};

export default Memos;