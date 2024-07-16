import axios from "axios";
import { useEffect, useState } from "react";
import { DataContext } from "./DataContext";

const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);

    const mergeData = (response) => {
        let processed = [];
        response.customers.forEach((customer) => {
            let customerTransactions = response.transactions.filter(
                (transaction) => transaction.customer_id === customer.id
            );
            let customerData = {
                id: customer.id,
                name: customer.name,
                transactions: customerTransactions.map((transaction) => ({
                    id: transaction.id,
                    amount: transaction.amount,
                    date: transaction.date,
                })),
            };
            processed.push(customerData);
        });

        setData(processed); 
    };

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(
                    "https://mohamedabdelhakem17.github.io/RouteEventTask/data.json"
                );
                mergeData(data);
            } catch (err) {
                console.error('Error fetching data:', err); 
            }
        })();
    }, []);


    return (
        <DataContext.Provider value={{ data }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
