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
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import styles from './DetailBook.module.css'
import commonStyles from '../../common/Common.module.css';

import CommonFunction from '../../common/CommonFunction'
import Constant from '../../common/Constant'

import BookService from '../../service/BookService'

import BookList from '../BookList'

export default function DetailBook({book}){
    const [booksInSet, setBooksInSet] = React.useState([])

    React.useEffect(() => {
        if(book.book_set_id){
            BookService.getAllDataGrid(1, 6, {bookSetId: book.book_set_id}, {orderBy: 'episode'}).then((res) => {
                setBooksInSet(res.data.data)
                console.log(res.data.data)
            })
        }
        
    }, [book])

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
                            <NumberChooser value={1} min={1} max={book.count} step={1}/>
                        </div>
                        <div className={"d-flex flex-row py-4 " + (book.count > 0 ? '' : commonStyles.hidden)}>
                            <Button className={styles.button} variant="outlined" startIcon={<AddShoppingCartIcon />}>
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
        </>
    )
}