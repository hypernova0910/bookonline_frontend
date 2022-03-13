import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <footer className="bg-dark text-white">
                {/* <!-- Grid container --> */}
                <div className="container p-4">
                {/* <!--Grid row--> */}
                <div className="row">
                    {/* <!--Grid column--> */}
                    <div className="col-lg-8 col-md-12 mb-4 mb-md-0">
                    <h5 className="text-uppercase">HỆ THỐNG BÁN SÁCH TRỰC TUYẾN - BOOKONLINE</h5>
            
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis
                        molestias. Fugiat pariatur maxime quis culpa corporis vitae repudiandae
                        aliquam voluptatem veniam, est atque cumque eum delectus sint!
                    </p>
                    </div>
                    {/* <!--Grid column--> */}
            
                    {/* <!--Grid column--> */}
                    <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
                    <h5 className="text-uppercase">Liên hệ</h5>
            
                    <ul className="list-unstyled mb-0">
                        <li>
                        <a href="#!" className="text-white" style={{textDecoration: "none"}}>Địa chỉ: Hà Nội</a>
                        </li>
                        <li>
                        <a href="#!" className="text-white" style={{textDecoration: "none"}}>Email: bookonline@gmail.com</a>
                        </li>
                        <li>
                        <a href="#!" className="text-white" style={{textDecoration: "none"}}>SĐT: 0123456789</a>
                        </li>
                        <li>
                        <a href="#!" className="text-white" style={{textDecoration: "none"}}>Fax: 0987654321</a>
                        </li>
                    </ul>
                    </div>
                    {/* <!--Grid column--> */}
                </div>
                {/* <!--Grid row--> */}
                </div>
                {/* <!-- Grid container --> */}
            
                {/* <!-- Copyright --> */}
                <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                Bán sách trực tuyến Bookonline © 2022
                </div>
                {/* <!-- Copyright --> */}
        </footer>
        )
    }
}

export default Footer;