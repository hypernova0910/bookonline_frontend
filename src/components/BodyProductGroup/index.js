import React from 'react';
//mui items
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Pagination from '@mui/material/Pagination';
//my components
import BookList from '../BookList'
//css modules
import styles from './BodyProductGroup.module.css';
import commonStyles from '../../common/Common.module.css';
//services
import BookService from '../../service/BookService';
import GenreService from '../../service/GenreService';

const prices = [
    {min: 0, max: 150000},
    {min: 150000, max: 300000},
    {min: 300000, max: 500000},
    {min: 500000, max: 700000},
    {min: 700000},
]

const orderByArr = [
    {orderBy: 'name', isAsc: true},
    {orderBy: 'sell_price'},
    {orderBy: 'discount_percent'},
]

export default function BodyProductGroup(props){
    const [orderBy, setOrderBy] = React.useState(0);
    const [limit, setLimit] = React.useState(12);
    const [priceRange, setPriceRange] = React.useState('')
    const [genresSelected, setGenresSelected] = React.useState([])

    const [books, setBooks] = React.useState([])
    const [genres, setGenres] = React.useState([])

    const [page, setPage] = React.useState(1)
    const [total, setTotal] = React.useState(0)

    const [loading, setLoading] = React.useState(true)

    // const handleChange = (event) => {
    //     setOrderBy(event.target.value);
    // };

    React.useEffect(() => {
        window.scrollTo(0, 0)
        BookService.getAllDataGrid(page, limit, 
            {
                productGroupId: props.groupId,
                minPrice: prices[priceRange] ? prices[priceRange].min : null,
                maxPrice: prices[priceRange] ? prices[priceRange].max : null,
                genres: genresSelected,
            }, 
            orderByArr[orderBy])
            .then((res) => {
                setBooks(res.data.data)
                setTotal(res.data.total)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [props.groupId, page, limit, priceRange, genresSelected, orderBy])

    React.useEffect(() => {
        GenreService.getAll(0, 0).then((res) => {
            setGenres(res.data)
        })
    }, [])

    return (
        <>
            <div className={"p-4 row " + commonStyles.bodyBg}>
                <FormControl className='col-lg-2 mx-2'>
                    <InputLabel>Sắp xếp theo</InputLabel>
                    <Select
                        // labelId="demo-simple-select-label"
                        id="orderBy"
                        value={orderBy}
                        label="Sắp xếp theo"
                        onChange={(e) => {setOrderBy(e.target.value)}}
                    >
                        <MenuItem value={0}>Tên</MenuItem>
                        <MenuItem value={1}>Giá bán</MenuItem>
                        <MenuItem value={2}>Chiết khấu</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className='col-lg-2 mx-2'>
                    <InputLabel>Phân trang theo</InputLabel>
                    <Select
                        // labelId="demo-simple-select-label"
                        id="limit"
                        value={limit}
                        label="Phân trang theo"
                        onChange={(e) => {
                            setLimit(e.target.value)
                            setPage(1)
                        }}
                    >
                        <MenuItem value={12}>12 sản phẩm</MenuItem>
                        <MenuItem value={24}>24 sản phẩm</MenuItem>
                        <MenuItem value={48}>48 sản phẩm</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className='col-lg-2 mx-2'>
                    <InputLabel>Mức giá</InputLabel>
                    <Select
                        // labelId="demo-simple-select-label"
                        id="priceRange"
                        //multiple
                        value={priceRange}
                        label="Mức giá"
                        onChange={(e) => {setPriceRange(e.target.value)}}
                        // renderValue={
                        //     (selected) => 
                        //     prices.filter((price,i) => 
                        //     selected.includes(i)).map((price) => 
                        //     price.min + 'đ - ' + (price.max ? price.max + 'đ' : 'Trở lên')).join(', ')}
                    >
                        {prices.map((price, i) => 
                            <MenuItem key={i} value={i}>
                                {price.min + 'đ - ' + (price.max ? price.max + 'đ' : 'Trở lên')}
                            </MenuItem>
                        )}
                        {/* <MenuItem value={1}>
                            <Checkbox checked={priceRange.includes(1)} />
                            <ListItemText primary={'0đ - 150.000đ'} />
                        </MenuItem> */}
                        {/* <MenuItem value={20}>20 sản phẩm</MenuItem>
                        <MenuItem value={50}>50 sản phẩm</MenuItem> */}
                    </Select>
                </FormControl>
                <FormControl className='col-lg-2 mx-2'>
                    <InputLabel>Thể loại</InputLabel>
                    <Select
                        // labelId="demo-simple-select-label"
                        id="genresSelected"
                        multiple
                        value={genresSelected}
                        label="Thể loại"
                        onChange={(e) => {setGenresSelected(e.target.value)}}
                        renderValue={
                            (selected) => 
                            genres.filter((genre) => 
                            selected.includes(genre.id)).map((genre) =>
                            genre.name).join(', ')
                            //selected.map(genre => genre.name).join(', ')
                        }
                    >
                        {genres.sort((gen1, gen2) => {
                            if(genresSelected.includes(gen1.id) && !genresSelected.includes(gen2.id)){
                                return -1
                            }
                            else if(!genresSelected.includes(gen1.id) && genresSelected.includes(gen2.id)){
                                return 1
                            }
                            else{
                                return 0
                            }
                        }).map((genre, i) => 
                            <MenuItem key={genre.id} value={genre.id}>
                                
                                <Checkbox checked={genresSelected.includes(genre.id)} />
                                <ListItemText primary={genre.name} />
                            </MenuItem>
                        )}
                        {/* <MenuItem value={1}>
                            <Checkbox checked={genres.includes(1)} />
                            <ListItemText primary={'0đ - 150.000đ'} />
                        </MenuItem> */}
                        {/* <MenuItem value={20}>20 sản phẩm</MenuItem>
                        <MenuItem value={50}>50 sản phẩm</MenuItem> */}
                    </Select>
                </FormControl>
            </div>
            <div className={"p-4 row " + commonStyles.bodyBg }>
                <BookList books={books} loading={loading}/>
            </div>
            <div className={"p-4 row " + commonStyles.bodyBg} style={{justifyContent:'center'}}>
                <Pagination 
                page={page} 
                onChange={(e, _page) => setPage(_page)}
                count={Math.ceil(total / limit)} 
                className={Math.ceil(total / limit) > 1 ? '' : commonStyles.hidden}
                sx={{width: 'auto'}}
                color="primary" />
            </div>
        </>
        
    )
}