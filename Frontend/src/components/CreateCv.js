import React, { Component } from 'react'
import CvService from '../services/CvService';

export default class CreateCv extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            department_name: '',
            tel_no: '',
            university_name: '',
            career_objective: '',
            alert: false
        }
        this.changeDepartmentHandler = this.changeDepartmentHandler.bind(this);
        this.changeTelHandler = this.changeTelHandler.bind(this);
        this.changeUniversityHandler = this.changeUniversityHandler.bind(this);
        this.changeCareerHandler = this.changeCareerHandler.bind(this);
        this.saveOrUpdateCv = this.saveOrUpdateCv.bind(this);
    }
    componentDidMount() {
        if (this.state.id === '_add') {
            return
        } else {
            CvService.getCvId(this.state.id).then((res) => {
                let cv = res.data;
                this.setState({
                    department_name: cv.department_name,
                    tel_no: cv.tel_no,
                    university_name: cv.university_name,
                    career_objective: cv.career_objective,
                });
            });
        }
    }
    saveOrUpdateCv = (e) => {
        e.preventDefault();
        let cv = {
            department_name: this.state.department_name, tel_no: this.state.tel_no, university_name: this.state.university_name,
            career_objective: this.state.career_objective
        };
        console.log('cv => ' + JSON.stringify(cv));
        if (this.state.id === '_add') {
            if (this.state.department_name === ''
                ||
                this.state.university_name === ''
                ||
                this.state.tel_no === ''
                ||
                this.state.career_objective === '') {
                this.setState({ alert: true })

            } else {
                CvService.createCv(cv).then(res => {
                    this.props.history.push('/Listcv');
                });
            }

        } else {
            CvService.updateCv(cv, this.state.id).then(res => {
                this.props.history.push('/Listcv');
                console.log(cv);
            });
        }
    }
    changeDepartmentHandler = (event) => {
        this.setState({ department_name: event.target.value });
    }
    changeTelHandler = (event) => {
        this.setState({ tel_no: event.target.value });
    }
    changeUniversityHandler = (event) => {
        this.setState({ university_name: event.target.value });
    }
    changeCareerHandler = (event) => {
        this.setState({ career_objective: event.target.value });
    }
    cancel() {
        this.props.history.push('/Listcv');
    }
    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Özgeçmiş Ekle</h3>
        } else {
            return <h3 className="text-center">Özgeçmiş Günceller</h3>
        }
    }
    render() {
        return (

            <div>
                <br></br>
                <div className="container">
                    <div className="row" style={{ margin: '15px' }}>
                        <div className="card col-md-6" >
                            <div className="card-body">
                                <div className="text-center">  {
                                    this.getTitle()
                                }</div>

                                <div className="text-center" style={{ color: 'red', margin: '5px' }}>    {this.state.alert ? 'Lütfen Tüm Alanları Doldurunuz.' : null}</div>

                                <form >
                                    <div className="row">
                                        <label> Üniversite Adı: </label>
                                        <input placeholder="Üniversite Adı" name="university_name" className="form-control"
                                            onChange={this.changeUniversityHandler} />
                                    </div>

                                    <div className="row">
                                        <label> Bölüm: </label>
                                        <input placeholder="Bölüm" name="department_name" className="form-control"
                                            onChange={this.changeDepartmentHandler} />
                                    </div>
                                    <div className="row">
                                        <label> Telefon Numarası: </label>
                                        <input placeholder="Telefon Numarası" name="tel_no" className="form-control"
                                            pattern="[+-]?\d+(?:[.,]\d+)?" type="number" maxLength={11} onChange={this.changeTelHandler} />
                                    </div>
                                    <div className="row" >
                                        <label> Kariyer Hedefi: </label>
                                        <textarea placeholder="Kariyer Hedefi" name="career_objective" className="form-control"
                                            onChange={this.changeCareerHandler} />
                                    </div>
                                    <div className="row" >
                                        <button className="btn btn-success" style={{ margin: '5px' }} onClick={this.saveOrUpdateCv}>Kaydet</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)}>Çıkış</button>
                                    </div>

                                </form>
                            </div></div>

                    </div>

                </div>
            </div>
        )
    }
}

