import React, { useEffect, useState } from 'react'
import { Card } from "@mui/material";
import Cookie from 'js-cookie'
import NavBar from '../Navbar'
import './index.css'

const ProductList = () => {
    const [productList, setProductsList] = useState([])

    useEffect(() => {
        const getData = async () => {
            const token = Cookie.get('jwtToken')
            const payload = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
            const data = await fetch('https://coding-assignment-server.vercel.app/products', payload)
            const response = await data.json()
            setProductsList(response)
        }
        getData()
    }, [])

    return (
        <div>
            <NavBar />
            <div className='products-container'>
                {productList.data?.map((eachItem, index) => {
                    console.log(eachItem)
                    return <li key={index} className='product-card' >
                        <Card
                            color="danger"
                            invertedColors
                            orientation="vertical"
                            size="md"
                            variant="outlined"
                            sx={{
                                margin: "10px",
                                padding: "0px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                minWidth: "150px",
                                maxWidth: "300px",
                            }}
                        >
                            <img src={eachItem.image_url} alt={eachItem.name} />
                            <p className='product-title'>{eachItem.name}</p>
                            <p className='price'> Price : ${eachItem.price}</p>
                            <div className='product-options'>
                                <div className="color-container">
                                    <p>Color</p>
                                    <div className="color-wrapper">
                                        {eachItem.color?.map((color, i) => (
                                            <div
                                                key={i}
                                                className="color"
                                                style={{ backgroundColor: color }}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="size-section">
                                    <p>Size</p>
                                    <ul className="size-container">
                                        {eachItem.sizes?.map((size) => (
                                            <li key={size} className="size">
                                                {size}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Card>
                    </li>
                })}
            </div>
        </div>
    )
}

export default ProductList