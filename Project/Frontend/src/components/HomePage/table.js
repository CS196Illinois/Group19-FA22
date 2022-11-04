import React, { useState } from 'react'
import JSONDATA from '../../MOCK_DATA.json'
import './table.css'

function Table() {

    const [searchQuery, setSearchQuery] = useState('')


    return (
        <div className="Table">
            <input type="text" placeholder="Search..." onChange={event => setSearchQuery(event.target.value)}/>
            <table class="table table-striped table-dark">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Email</th>
                    <th scope="col">Gender</th>
                    <th scope="col">IP Address</th>
                    </tr>
                </thead>
                <tbody>
                {
                    JSONDATA.filter(value => {
                        if (searchQuery == '') {
                            return value;
                        } else if (value.first_name.toLowerCase().includes(searchQuery.toLowerCase())) {
                            return value
                        }
                    }).map((val, key) => {
                        return (
                            <tr key={key}>
                                <th scope="row">{val.id}</th>
                                <td>{val.first_name}</td>
                                <td>{val.last_name}</td>
                                <td>{val.email}</td>
                                <td>{val.gender}</td>
                                <td>{val.ip_address}</td>
                            </tr>
                            // <div className="user" key={key}>
                            //     <p>{val.first_name}</p>
                            // </div>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )

}

export default Table