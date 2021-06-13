import React from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import Swal from 'sweetalert2'
import './Dashboard.css';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            items: [],
            headers: [],
            itemSelected: null,
            modalState: "add",
            id: "",
            name: "",
            price: "",
            category: ""
        }
    }

    async componentDidMount() {
        let items = await axios.get("http://localhost:8080/api/getAllItems");
        items = items.data.items;

        let headers = items.map((item, index) => {
            if (index === 0) {
                return Object.keys(item).map(header => header)
            }
            return null
        })[0]

        this.setState({
            items: items,
            headers: headers
        })
    }

    editItem = (id, modalState) => {
        let items = this.state.items;
        let selected = items.filter(item => item.id === id)[0]
        this.setState({
            itemSelected: selected,
            id: selected.id,
            name: selected.name,
            price: selected.price,
            category: selected.category,
            modalState
        }, () => {
            this.handleShow()
        })
    }

    handleShow = () => this.setState({ show: true })
    handleClose = () => this.setState({ show: false })
    addItem = () => this.setState({
        show: true,
        modalState: 'add' ,
        id: "",
        name: "",
        price: "",
        category: ""
    })

    changeText = (event, field) => {
        this.setState({ [field]: event.target.value })
    }

    updateItems = async () => {
        let { id, name, price, category } = this.state;

        if (id === "" || name === "" || price === "" || category === "") {
            console.log("Enter all the fields")
        } else {
            let obj = {
                id, name, price, category
            }

            let res = await axios.post("http://localhost:8080/api/updateItem", obj)
            this.setState({
                items: res.data.items
            }, () => {
                this.handleClose()
            })
        }
    }

    deleteItem = async (id) => {
        Swal.fire({
            title: 'Do you want to save the changes?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: `Delete`,
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                let res = await axios.get("http://localhost:8080/api/deleteItem?id=" + id)
                this.setState({
                    items: res.data.items
                })
            }
        })
    }

    render() {
        let {headers, items, show, itemSelected, modalState } = this.state;
        return (
            <div className="container mt-5">
                <h3>Warehouse Management</h3>
                <p>Item stock list in the warehouse</p>


                <button className="btn btn-primary d-block mb-3 ml-auto" onClick={this.addItem}>
                    Add Item
                </button>

                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        {
                            headers.map(header => (
                                <th scope="col">{header}</th>
                            ))
                        }
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        items.map(item => (
                            <tr>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.category}</td>
                                <td>
                                    <span className="clickable" onClick={() => this.editItem(item.id, "edit")}>
                                        Edit
                                    </span>
                                    &nbsp; | &nbsp;
                                    <span className="clickable" onClick={() => this.deleteItem(item.id)}>
                                        Delete
                                    </span>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>

                <Modal show={show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {
                                modalState === "add" ? "Add New Item" : "Edit Item"
                            }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <input type="text" className="form-control"
                                   id="itemId" aria-describedby="itemId"
                                   placeholder="Product ID"
                                   value={ this.state.id }
                                   onChange={(e) => this.changeText(e, "id")}
                                   disabled={this.state.modalState === "edit"}
                            />
                                <div id="itemId" className="form-text">
                                    Enter the product ID you want to edit.
                                </div>
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control"
                                   id="itemName" aria-describedby="itemName"
                                   placeholder="Product Name"
                                   value={ this.state.name }
                                   onChange={(e) => this.changeText(e, "name")}
                            />
                            <div id="itemId" className="form-text">
                                Enter the product name you want to edit.
                            </div>
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control"
                                   id="itemPrice" aria-describedby="itemPrice"
                                   placeholder="Product Price"
                                   value={ this.state.price }
                                   onChange={(e) => this.changeText(e, "price")}
                            />
                            <div id="itemId" className="form-text">
                                Enter the product price you want to edit.
                            </div>
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control"
                                   id="itemCategory" aria-describedby="itemCategory"
                                   placeholder="Product Category"
                                   value={ this.state.category }
                                   onChange={(e) => this.changeText(e, "category")}
                            />
                            <div id="itemId" className="form-text">
                                Enter the product category you want to edit.
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={this.updateItems}>
                            {
                                modalState === "add" ? "Add Item" : "Update Item"
                            }
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Dashboard;