import React, { Component } from 'react'
import CvService from '../services/CvService';

class UpdateCv extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            department_name: '',
            university_name: '',
            career_objective: '',
            tel_no: '',
            alert: false
        }
        this.changeUniversityHandler = this.changeUniversityHandler.bind(this);
        this.changeDepartmentHandler = this.changeDepartmentHandler.bind(this);
        this.changeCareerHandler = this.changeCareerHandler.bind(this);
        this.changeTelHandler = this.changeTelHandler.bind(this);
        this.updateCv = this.updateCv.bind(this);
    }
    componentDidMount() {
        CvService.getCvId(this.state.id).then((res) => {
            let cv = res.data;
            this.setState({
                department_name: cv.department_name,
                university_name: cv.university_name,
                career_objective: cv.career_objective,
                tel_no: cv.tel_no
            });
        });
    }
    updateCv = (e) => {
        e.preventDefault();
        let cv = {
            department_name: this.state.department_name,
            university_name: this.state.university_name,
            tel_no: this.state.tel_no,
            career_objective: this.state.career_objective
        };

        if (this.state.department_name === ''
            ||
            this.state.university_name === ''
            ||
            this.state.tel_no === ''
            ||
            this.state.career_objective === '') {
            this.setState({ alert: true })
            console.log("bölüm yeri boş" + this.state.alert)
        } else {
            CvService.updateCv(this.state.id, cv).then(res => {
                this.props.history.push('/Listcv');
            });
        }
    }
    changeUniversityHandler = (event) => {
        this.setState({ university_name: event.target.value });
    }
    changeCareerHandler = (event) => {
        this.setState({ career_objective: event.target.value });
    }
    changeDepartmentHandler = (event) => {
        this.setState({ department_name: event.target.value });
    }
    changeTelHandler = (event) => {
        this.setState({ tel_no: event.target.value });
    }
    cancel() {
        this.props.history.push('/Listcv');
    }
    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row" style={{ margin: '15px' }}>
                        <div className="card col-md-6">
                            <h3 className="text-center" style={{ marginTop: '15px' }}>Özgeçmiş Güncelle</h3>

                            <div className="text-center" style={{ color: 'red', margin: '5px' }}>    {this.state.alert ? 'Lütfen Tüm Alanları Doldurunuz.' : null}</div>

                            <div className="card-body">

                                <form >
                                    <div className="row">
                                        <label> Üniversite Adı: </label>
                                        <input placeholder="Üniversite Adı" name="university_name" className="form-control"
                                            value={this.state.university_name} onChange={this.changeUniversityHandler} />
                                    </div>

                                    <div className="row">
                                        <label> Bölüm: </label>
                                        <input placeholder="Bölüm" name="department_name" className="form-control"
                                            value={this.state.department_name} onChange={this.changeDepartmentHandler} />
                                    </div>
                                    <div className="row">
                                        <label> Telefon Numarası: </label>
                                        <input placeholder="Telefon Numarası" name="tel_no" className="form-control"
                                            pattern="[+-]?\d+(?:[.,]\d+)?" type="number" maxLength={11} value={this.state.tel_no} onChange={this.changeTelHandler} />
                                    </div>
                                    <div className="row">
                                        <label> Kariyer Hedefi: </label>
                                        <textarea placeholder="Kariyer Hedefi" name="tel_no" className="form-control"
                                            value={this.state.career_objective} onChange={this.changeCareerHandler} />
                                    </div>
                                    <div className="row" >
                                        <button className="btn btn-success" onClick={this.updateCv}>Kaydet</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginTop: "10px" }}>Çıkış</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default UpdateCv