import React from 'react';
import {BackdropContext} from '../../context/BackdropProvider'
import {AuthContext} from '../../context/AuthProvider'
import {CartContext} from '../../context/CartProvider'

import CartService from '../../service/CartService'
import CartBookService from '../../service/CartBookService'

import commonStyles from '../../common/Common.module.css';
import Constant from '../../common/Constant'
import CommonFunction from '../../common/CommonFunction'
import styles from './CartPage.module.css'

import { DataGrid } from '@mui/x-data-grid';
import NumberChooser from '../NumberChooser';
import Button from '../Button'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CardMedia from '@mui/material/CardMedia';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';

import {useNavigate} from 'react-router-dom'

function CustomNoRowsOverlay(props){
    return (
        <div style={{height: 'auto', width: '838px', position: 'absolute', top: '56px', bottom: '0px'}}><div className={styles.noRows}>Giỏ hàng trống</div></div>
    )
}

export default function CartPage(props){
    const [loading, setLoading] = React.useContext(BackdropContext)
    const [ customerId, dispatch ] = React.useContext(AuthContext);

    const [ cart, dispatchCart ] = React.useContext(CartContext);

    const [bookCountState, setBookCountState] = React.useState({})
    const [rows, setRows] = React.useState([])
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [total, setTotal] = React.useState(0)

    const navigate = useNavigate();

    const columns = [
        // { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'thumb_nail',
            headerName: '',
            flex: 20,
            sortable: false,
            headerAlign: "center",
            align: 'center',
            renderCell: (params) => (
                <CardMedia
                component="img"
                image={params.value ? (Constant.IMAGE_URL + params.value) : ''}
                alt={'ẢNH'}
                onClick={() => {navigate('/chi-tiet/' + params.id)}}
                />
            )
        },
        {
            field: 'nameAndPrice',
            headerName: 'Thông tin sản phẩm',
            flex: 45,
            sortable: false,
            // headerAlign: "center",
            // align: 'center',
            renderCell: (params) => (
                <div className='d-flex' style={{flexDirection: 'column', justifyContent: 'space-between', height: '100%', whiteSpace: 'normal'}}>
                    <h5 style={{padding: '20px 10px'}}>{params.value.name}</h5>
                    <h6 style={{padding: '20px 10px'}}>
                        <span style={{fontWeight: 'bold'}}>
                            {CommonFunction.numberWithCommas(params.value.price * (100 - params.value.discount_percent) / 100) + 'đ'}
                        </span>
                        <del style={{paddingLeft: '20px', color: '#aaa', display: params.value.discount_percent ? '' : 'none'}}>
                            {CommonFunction.numberWithCommas(params.value.price) + 'đ'}
                        </del>
                    </h6>
                </div>
            )
        },
        {
            field: 'book_count',
            headerName: 'Số lượng',
            type: 'number',
            flex: 15,
            sortable: false,
            headerAlign: "center",
            align: 'center',
        //   editable: true,
            renderCell: (params) => (
                <NumberChooser 
                value={bookCountState[params.id]} 
                // setValue={setCount} 
                min={1} 
                max={params.value} 
                step={1}
                size='small'
                setValue={(value) => {
                    // console.log(value)
                    // console.log(bookCountState)
                    setLoading(true)
                    // let i = cart.cartBooks.findIndex((cartBook) => cartBook.id.book_id == params.value.id)
                    // cart.cartBooks[i].book_count = value
                    let totalTemp = 0
                    for(let i = 0; i < cart.cartBooks.length; i++) {
                        if(cart.cartBooks[i].id.book_id == params.id){
                            cart.cartBooks[i].book_count = value
                        }
                        if(selectionModel.includes(cart.cartBooks[i].id.book_id)) {
                            totalTemp += cart.cartBooks[i].book_count * (cart.cartBooks[i].book.sell_price * (100 - cart.cartBooks[i].book.discount_percent) / 100)
                        }
                    }
                    CartService.update(cart).then((res) => {
                        setBookCountState({...bookCountState, [params.id]: value})
                        setTotal(totalTemp)
                    }).finally(() => {
                        setLoading(false)
                    })
                    
                }}
                />
            )
        },
        {
            field: 'total_money',
            headerName: 'Thành tiền',
            // sortable: false,
            flex: 15,
            sortable: false,
            headerAlign: "center",
            align: 'center',
            valueGetter: (params) =>
            CommonFunction.numberWithCommas(params.row.nameAndPrice.price * (100 - params.row.nameAndPrice.discount_percent) / 100 * bookCountState[params.row.id]) + 'đ',
        },
        { 
            field: 'delete', 
            headerName: '', 
            flex: 5,
            sortable: false,
            headerAlign: "center",
            align: 'center',
            renderCell: (params) => (
                <DeleteOutlinedIcon onClick={() => {removeRow(params.value)}}/>
            )
        }
    ];

    const removeRow = ({id, price}) => {
        setLoading(true);
        CartBookService.delete({cart_id: cart.id, book_id: id})
        .then((res) => {
            if(selectionModel.includes(id)){
                setTotal(total - (bookCountState[id] * price))
            }
            setRows(rows.filter(row => row.id !== id))
            CartService.getCartByCustomerId(customerId).then((res) => {
                //console.log(res.data)
                dispatchCart({type: "assign", cart: res.data})
            })
        })
        .finally(() => {
            setLoading(false);
        })
    }

    React.useEffect(() => {
        if(Array.isArray(cart.cartBooks)){
            let bookCountTemp = {}
            let selectionModelTemp = []
            let totalTemp = 0
            setRows(cart.cartBooks.map(({book, book_count, selected}) => {
                bookCountTemp = {...bookCountTemp, [book.id]: book_count}
                if(selected){
                    selectionModelTemp.push(book.id)
                    totalTemp += book_count * (book.sell_price * (100 - book.discount_percent) / 100)
                }
                return {
                    id: book.id,
                    thumb_nail: book.thumb_nail,
                    nameAndPrice: {name: book.name, price: book.sell_price, discount_percent: book.discount_percent},
                    book_count: book.count,
                    total_money: book_count * (book.sell_price * (100 - book.discount_percent) / 100),
                    delete: {id: book.id, price: book.sell_price * (100 - book.discount_percent) / 100},
                }
            }))
            setBookCountState(bookCountTemp)
            //console.log(selectionModelTemp)
            setSelectionModel(selectionModelTemp)
            setTotal(totalTemp)
        }
    }, [cart])

    const handleSelectionModelChange = (newSelectionModel) => {
        setLoading(true)
        // let i = cart.cartBooks.findIndex((cartBook) => newSelectionModel.includes(cartBook.id.book_id))
        // cart.cartBooks[i].selected = value
        let totalTemp = 0
        for(let i = 0; i < cart.cartBooks.length; i++) {
            if(newSelectionModel.includes(cart.cartBooks[i].id.book_id)) {
                cart.cartBooks[i].selected = true
                totalTemp += cart.cartBooks[i].book_count * (cart.cartBooks[i].book.sell_price * (100 - cart.cartBooks[i].book.discount_percent) / 100)
            }
            else{
                cart.cartBooks[i].selected = false
            }
        }
        CartService.update(cart).then((res) => {
            setSelectionModel(newSelectionModel)
            setTotal(totalTemp)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div className="row">
            {/* <div className={"col-lg-8"}> */}
                <div className={"col-lg-8"}>
                    <DataGrid
                        className={"my-4 mx-2 " + commonStyles.bodyBg}
                        rowHeight={200}
                        rows={rows}
                        columns={columns}
                        // pageSize={5}
                        // rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                        autoHeight
                        hideFooter
                        selectionModel={selectionModel}
                        onSelectionModelChange={handleSelectionModelChange}
                        components={{
                            NoRowsOverlay: CustomNoRowsOverlay
                        }}
                    />
                </div>
            {/* </div> */}
            <div className={"col-lg-4"}>
                <div className={"my-4 mx-2 p-2 " + commonStyles.bodyBg}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Thành tiền</TableCell>
                                    <TableCell align="right">{CommonFunction.numberWithCommas(total) + ' đ'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{width: '65%'}}>Phí vận chuyển (Giao hàng tiêu chuẩn)</TableCell>
                                    <TableCell align="right">{total == 0 ? '0 đ' : '15.000 đ'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{width: '65%', fontWeight: 'bold', fontSize: '1.1rem'}}>Tổng Số Tiền (gồm VAT)</TableCell>
                                    <TableCell align="right" sx={{fontWeight: 'bold', fontSize: '1.3rem', color: '#d12b33'}}>
                                        {CommonFunction.numberWithCommas(total + (total == 0 ? 0 : 15000) + ' đ')}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button style={{margin: '20px auto'}} disabled={total == 0}>Thanh toán</Button>
                </div>
            </div>
        </div>
    )
}