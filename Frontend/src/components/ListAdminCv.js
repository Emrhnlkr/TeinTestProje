import React, { Component } from 'react'
import CvService from '../services/CvService'

class ListAdminCv extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Allcv: [],
            id: ''
        }
    }
    componentDidMount() {
        CvService.getAllCv().then((res) => {
            this.setState({ Allcv: res.data });
        });
    }
    render() {
        return (
            <div>
                <h2 className="text-center">Tüm Özgeçmişler</h2>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Kişi Adı</th>
                                <th>Kişi Soyadı</th>
                                <th>Email Adresi</th>
                                <th>Üniversite Adı</th>
                                <th>Bölüm</th>
                                <th>Telefon Numarası</th>
                                <th>Kariyer Hedefi</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.Allcv.map(
                                    cv =>
                                        <tr key={cv.id}>
                                            <td>{cv.user_id.firstName}</td>
                                            <td>{cv.user_id.lastName}</td>
                                            <td>{cv.user_id.email}</td>
                                            <td> {cv.university_name} </td>
                                            <td> {cv.department_name}</td>
                                            <td> {cv.tel_no}</td>
                                            <td> {cv.career_objective}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default ListAdminCv