import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Rating from '@mui/material/Rating';
import NumberChooser from '../NumberChooser'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Divider from '@mui/material/Divider';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateIcon from '@mui/icons-material/Create';
import Pagination from '@mui/material/Pagination';

import styles from './DetailBook.module.css'
import commonStyles from '../../common/Common.module.css';

import CommonFunction from '../../common/CommonFunction'
import Constant from '../../common/Constant'

import BookService from '../../service/BookService'
import FeedbackService from '../../service/FeedbackService'
import CartService from '../../service/CartService'

import BookList from '../BookList'
import LinearProgressWithLabel from '../LinearProgressWithLabel'
import FeedbackList from '../FeedbackList';
import FeedbackForm from '../FeedbackForm';

import {AuthContext} from '../../context/AuthProvider'
import {CartContext} from '../../context/CartProvider'

import useSnackbar from '../../hooks/useSnackbar'

export default function DetailBook({book}){
    const [booksInSet, setBooksInSet] = React.useState([])
    const [feedbacks, setFeedbacks] = React.useState([])
    const [page, setPage] = React.useState(1)
    const [limit, setLimit] = React.useState(10)
    const [count, setCount] = React.useState(1)
    const [statistic, setStatistic] = React.useState({
        "book_id": 0,
        "star1": 0.0,
        "star2": 0.0,
        "star3": 0.0,
        "star4": 0.0,
        "star5": 0.0,
        "total": 0,
        "average": 0.0
    })
    const [feedbackFormOpen, setFeedbackFormOpen] = React.useState(false)
    const [idCustomer, dispatch] = React.useContext(AuthContext)
    const [ cart, dispatchCart ] = React.useContext(CartContext);
    const {toast} = useSnackbar()

    React.useEffect(() => {
        if(book.book_set_id){
            BookService.getAllDataGrid(1, 6, {bookSetId: book.book_set_id}, {orderBy: 'episode'}).then((res) => {
                setBooksInSet(res.data.data)
            })
        }
        if(!isNaN(book.id)){
            FeedbackService.statistic(book.id).then((res) => {
                setStatistic(res.data)
            })
        }
    }, [book])

    React.useEffect(() => {
        if(!isNaN(book.id)){
            FeedbackService.getAllDataGrid(page, limit, book.id).then((res) => {
                setFeedbacks(res.data.data)
            })
        }
    }, [book, page, limit])

    const addToCart = () => {
        console.log(count)
        if(idCustomer > 0){
            if(cart.cartBooks == null){
                cart.cartBooks = []
            }
            if(!cart.cartBooks.some((cartBook) => cartBook.id.book_id == book.id)){
                cart.cartBooks.push({
                    "id": {
                        "book_id": book.id,
                        "cart_id": cart.id
                    },
                    "book_count": count,
                    cart: {id: cart.id},
                    book: {id: book.id},
                    sell_price: book.sell_price * (100 -book.discount_percent) / 100,
                    total_money: (book.sell_price * (100 -book.discount_percent) / 100) * count,
                })
            }
            else{
                let i = cart.cartBooks.findIndex((cartBook) => cartBook.id.book_id == book.id)
                cart.cartBooks[i].book_count += count
            }
            //console.log(cart)
            CartService.update(cart)
            .then((response) => {
                toast('success', 'Thêm vào giỏ hàng thành công')
                CartService.getCartByCustomerId(idCustomer).then((res) => {
                    //console.log(res.data)
                    dispatchCart({type: "assign", cart: res.data})
                })
            })
            .catch((error) => {
                console.error(error)
                toast('error', 'Thêm vào giỏ hàng thất bại')
            })
                
            
        }
    }

    const onClickWriteFeedback = (e) => {
        setFeedbackFormOpen(true)
    }

    const onSaveFeedback = (feedback) => {
        FeedbackService.add(feedback).then((res) => {
            toast('success', 'Gửi nhận xét thành công')
            setFeedbackFormOpen(false)
            if(!isNaN(book.id)){
                FeedbackService.getAllDataGrid(page, limit, book.id).then((res) => {
                    setFeedbacks(res.data.data)
                })
                FeedbackService.statistic(book.id).then((res) => {
                    setStatistic(res.data)
                })
            }
        }).catch((err) => {
            toast('error', 'Gửi nhận xét thất bại')
            console.error(err)
        })
    }

    return(
        <>
            <div className={"row p-4 my-2 " + commonStyles.bodyBg}>
                <div className="col-lg-5">
                    <CardMedia
                    component="img"
                    image={book.thumb_nail ? (Constant.IMAGE_URL + book.thumb_nail) : ''}
                    alt={book.name}
                    />
                    
                </div>
                <div className="col-lg-7">
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            {book.name}
                        </Typography>
                        <div className='row'>
                            <div className={"col-lg-6 " + (book.publisher_idST ? '' : commonStyles.hidden)}>
                                <Typography variant="p" component="div">
                                    {'Nhà xuất bản: ' + book.publisher_idST}
                                </Typography>
                            </div>
                            <div className={"col-lg-6 " + (book.provider_idST ? '' : commonStyles.hidden)}>
                                <Typography variant="p" component="div">
                                    {'Nhà cung cấp: ' + book.provider_idST}
                                </Typography>
                            </div>
                            <div className={"col-lg-6 " + (book.author_idST ? '' : commonStyles.hidden)}>
                                <Typography variant="p" component="div">
                                    {'Tác giả: ' + book.author_idST}
                                </Typography>
                            </div>
                            <div className={"col-lg-6 " + (book.translator ? '' : commonStyles.hidden)}>
                                <Typography variant="p" component="div">
                                    {'Người dịch: ' + book.translator}
                                </Typography>
                            </div>
                        </div>
                        {/* <Rating className="py-2" name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly /> */}
                        <Typography className="py-4" variant="h3" sx={{color: '#F7941E'}}>
                            {CommonFunction.numberWithCommas(book.sell_price ? book.sell_price * (100 -book.discount_percent) /100 : 0) + 'đ'}
                        </Typography>
                        <div className="d-flex flex-row">
                            <label style={{paddingRight: '20px'}}>Số lượng</label>
                            <NumberChooser value={count} setValue={setCount} min={1} max={book.count} step={1}/>
                        </div>
                        <div className={"d-flex flex-row py-4 " + (book.count > 0 ? '' : commonStyles.hidden)}>
                            <Button onClick={addToCart} className={styles.button} variant="outlined" startIcon={<AddShoppingCartIcon />}>
                                Thêm vào giỏ hàng
                            </Button>
                            <Button className={styles.button} variant="contained">
                                Mua ngay
                            </Button>
                        </div>
                        <div className={"row py-4 " + (book.count > 0 ? commonStyles.hidden : '')}>
                            <Typography variant="body1 " className={styles.message + ' ' + styles.error}>
                                Sản phẩm tạm hết hàng
                            </Typography>
                        </div>
                    </CardContent>
                </div>
            </div>
            <div className={"row p-4 my-2 " + commonStyles.bodyBg + ' ' + (book.book_set_id ? '' : commonStyles.hidden)}>
                <Typography variant="h6" component="div" className={styles.headerGroup}>
                    SÁCH CÙNG BỘ
                </Typography>
                <BookList books={booksInSet}/>
            </div>
            <div className={"row p-4 my-2 " + commonStyles.bodyBg}>
                <Typography variant="h6" component="div" className={styles.headerGroup}>
                    THÔNG TIN CHI TIẾT
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        {/* <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                        </TableHead> */}
                        <TableBody>
                        
                            <TableRow
                            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>Tên nhà cung cấp</TableCell>
                                <TableCell>{book.provider_idST}</TableCell>
                            </TableRow>
                            <TableRow
                            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            className={book.author_idST ? '' : commonStyles.hidden}
                            >
                                <TableCell>Tác giả</TableCell>
                                <TableCell>{book.author_idST}</TableCell>
                            </TableRow>
                            <TableRow
                            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>Nhà xuất bản</TableCell>
                                <TableCell>{book.publisher_idST}</TableCell>
                            </TableRow>
                            <TableRow
                            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>Năm xuất bản</TableCell>
                                <TableCell>{book.publish_year}</TableCell>
                            </TableRow>
                            <TableRow
                            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>Trọng lượng</TableCell>
                                <TableCell>{book.weight + 'g'}</TableCell>
                            </TableRow>
                            <TableRow
                            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>Kích thước bao bì</TableCell>
                                <TableCell>{book.width + ' x ' + book.length}</TableCell>
                            </TableRow>
                            <TableRow
                            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>Số trang</TableCell>
                                <TableCell>{book.page_count}</TableCell>
                            </TableRow>
                            <TableRow
                            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>Hình thức</TableCell>
                                <TableCell>{book.cover_formST}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Paper sx={{padding: '30px'}}>
                    {book.description ? CommonFunction.separateLines(book.description).map((line, i) => 
                        <Typography key={i} sx={{marginBottom: '10px'}} component="p">{line}</Typography>
                    ) : ''}
                </Paper>
            </div>
            <div className={"row p-4 my-2 " + commonStyles.bodyBg}>
                <Typography variant="h6" component="div" className={styles.headerGroup}>
                    ĐÁNH GIÁ
                </Typography>
                <div className='row'>
                    <div className={'col-lg-2 ' + styles.ratingStar + ' ' + styles.rating}>
                        <h1>{statistic.average.toFixed(1)}<span style={{fontSize: '0.5em'}}>/5</span></h1>
                        <Rating className="py-2" value={parseFloat(statistic.average.toFixed(1))} precision={0.1} readOnly />
                        <h6>{`(${statistic.total} đánh giá)`}</h6>
                    </div>
                    <div className={'col-lg-4 ' + styles.ratingPercent + ' ' + styles.rating}>
                        <div className='row'>
                            <label className='col-lg-2 col-md-2'>5 sao</label>
                                <LinearProgressWithLabel className='col-lg-10 col-md-10' value={statistic.star5} />
                            </div>
                            <div className='row'>
                                <label className='col-lg-2 col-md-2'>4 sao</label>
                                <LinearProgressWithLabel className='col-lg-10 col-md-10' value={statistic.star4} />
                            </div>
                            <div className='row'>
                                <label className='col-lg-2 col-md-2'>3 sao</label>
                                <LinearProgressWithLabel className='col-lg-10 col-md-10' value={statistic.star3} />
                            </div>
                            <div className='row'>
                                <label className='col-lg-2 col-md-2'>2 sao</label>
                                <LinearProgressWithLabel className='col-lg-10 col-md-10' value={statistic.star2} />
                            </div>
                            <div className='row'>
                                <label className='col-lg-2 col-md-2'>1 sao</label>
                                <LinearProgressWithLabel className='col-lg-10 col-md-10' value={statistic.star1} />
                            </div>
                        </div>
                    <div className={'col-lg-6 ' + styles.rating + ' ' + styles.ratingPercent + ' ' + styles.ratingStar + ' ' + (idCustomer > 0 ? '' : commonStyles.hidden)}>
                        <Button className={styles.button} variant="outlined" startIcon={<CreateIcon />} onClick={onClickWriteFeedback}>
                            Viết đánh giá
                        </Button>
                        <FeedbackForm bookId={book.id} open={feedbackFormOpen} onSaveFeedback={onSaveFeedback} onClose={(e) => {setFeedbackFormOpen(false)}}/>
                    </div>
                </div>
                <Divider/>
                <div className='row'>
                    <FeedbackList feedbacks={feedbacks}/>
                </div>
                <div className="row" style={{justifyContent:'center'}}>
                    <Pagination 
                    page={page} 
                    onChange={(e, _page) => setPage(_page)}
                    count={Math.ceil(statistic.total / limit)} 
                    className={Math.ceil(statistic.total / limit) > 1 ? '' : commonStyles.hidden}
                    sx={{width: 'auto'}}
                    color="primary" />
                </div>
            </div>
        </>
    )
}