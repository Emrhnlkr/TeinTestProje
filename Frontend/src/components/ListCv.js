import React, { Component } from 'react'
import CvService from '../services/CvService'

export default class ListCv extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Cvs: []
        }
        this.addCv = this.addCv.bind(this);
        this.editCv = this.editCv.bind(this);
        this.deleteCv = this.deleteCv.bind(this);

    }

    deleteCv(id) {

        CvService.deleteCv(id).then(res => {
            this.setState({ Cvs: this.state.Cvs.filter(cv => cv.id !== id) });
        });
    }

    editCv(id) {
        this.props.history.push(`/Updatecv/${id}`);
    }

    componentDidMount() {
        CvService.getCv().then((res) => {
            this.setState({ Cvs: res.data });

        });
    }

    addCv() {
        this.props.history.push('/Addcv/_add');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Kendi Özgeçmişlerim</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addCv}>Özgeçmiş Ekle</button>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Üniversite Adı</th>
                                <th>Bölüm</th>
                                <th>Telefon Numarası</th>
                                <th>Kariyer Hedefi</th>
                                <th>Sil / Güncelle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.Cvs.map(
                                    cv =>
                                        <tr key={cv.id}>
                                            <td> {cv.university_name} </td>
                                            <td> {cv.department_name}</td>
                                            <td> {cv.tel_no}</td>
                                            <td> {cv.career_objective}</td>
                                            <td>
                                                <button onClick={() => this.editCv(cv.id)} className="btn btn-info">Güncelle</button>
                                                <button style={{ marginTop: "10px" }} onClick={() => this.deleteCv(cv.id)} className="btn btn-danger">Sil</button>

                                            </td>
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

