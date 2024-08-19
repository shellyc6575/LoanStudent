// Endpoint for  olx Subgraph endpoints:
// Queries (HTTP):     https://api.studio.thegraph.com/query/54911/olx-marketplac/v0.0.1

import { useState, useEffect } from "react";
import { createClient } from "urql";


var proposalId = localStorage.getItem("proposalId");

const Propos = () => {



  const [tokens, setTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

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
        setTokens(data.proposalCreateds);
        
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

            <div key={index}>
                 Description: {token.description} ,  creator: {token.creator} ,  amount: {token.amount}
            </div>
        ))
      ) : (
        <div>No data available</div>
      )}
    </>
  );
};

export default Propos;