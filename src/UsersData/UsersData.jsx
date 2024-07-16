import React, { useState } from "react";
import useGetData from "../context/DataProvider/DataContext";
import { Link } from "react-router-dom";

export default function UsersData() {
    const { data } = useGetData();
    const [search, setSearch] = useState("");
    const [searchMode, setSearchMode] = useState("name");

    return (
        <>
            <div className="mt-5 pt-5 container">
                <h1 className="text-center w-50 bg-dark my-2 mx-auto py-2 text-light rounded h1 fw-bolder">
                    User List
                </h1>

                <div className="fillter row my-3 w-75 mx-auto gy-3">
                    <div className="col-12 col-md-7">
                        <div className="input-group input-group-lg">
                            <input type="text" className="form-control" placeholder="Search" aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-lg" onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-5 d-flex align-items-center justify-content-between">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="searchType" id="name"
                                checked={searchMode === "name"} onChange={() => setSearchMode("name")}
                            />

                            <label className="form-check-label text-light fw-bolder" htmlFor="name">
                                Search By Name
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="searchType" id="amount"
                                checked={searchMode === "amount"} onChange={() => setSearchMode("amount")}
                            />
                            <label className="form-check-label text-light fw-bolder" htmlFor="amount">
                                Search By Amount
                            </label>
                        </div>
                    </div>
                </div>

                <div className="table-responsive shadow-lg rounded rounded-lg  mx-auto overflow-hidden m-0">
                    <table className="table table-bordered table-hover table-dark table-striped  px-2 m-0">
                        <thead>

                            <tr className="text-center fw-bolder h2">
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Transactions</th>
                            </tr>

                        </thead>
                        <tbody>

                            {
                                data
                                    .filter((user) => {
                                        if (search !== "") {
                                            if (searchMode === "name")
                                                return user.name.toLowerCase().includes(search.toLowerCase())
                                            if (searchMode === "amount") {
                                                return user.transactions.some(transaction => transaction.amount === +search);
                                            }
                                            return true
                                        } else {
                                            return user;
                                        }
                                    })
                                    .map((user) =>
                                        <tr key={user.id} className="h4">
                                            <td >{user.id}</td>
                                            <td>
                                                <Link to={`/customer/${user.id}`}>{user.name} </Link> </td> <td>
                                                {user.transactions
                                                    .filter(transaction => {
                                                        if (searchMode === "amount") {
                                                            return !search || search.trim() === "" || transaction.amount === +search;
                                                        }
                                                        return true;
                                                    })
                                                    .map((transaction, index) => (
                                                        <p key={index} className="d-flex justify-content-around h6">
                                                            <span>Date : {transaction.date}</span>
                                                            <span>Amount : {transaction.amount}</span>
                                                        </p>
                                                    ))}
                                            </td>
                                        </tr>
                                    )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}