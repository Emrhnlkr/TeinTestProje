import axios from 'axios';
//Api'lerin çağırıldığı sınıf
const Cv_API_BASE_URL = "http://localhost:8081/user/cv";
const AllCv_API_BASE_URL = "http://localhost:8081/admin/cv";
class CvService {

    getInfo() {
        return axios.get("http://localhost:8081/info", {
            headers: {
                'Accept-Language': 'tr',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }
        );
    }

    getAllCv() {
        return axios.get(AllCv_API_BASE_URL, {
            headers: {
                'Accept-Language': 'tr',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }
        );
    }

    getCv() {
        return axios.get(Cv_API_BASE_URL, {
            headers: {
                'Accept-Language': 'tr',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }
        );
    }

    createCv(cv) {
        return axios.post(Cv_API_BASE_URL, cv, {
            headers: {
                'Accept-Language': 'tr',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
    }

    getCvId(cvId) {
        return axios.get(Cv_API_BASE_URL + '/' + cvId, {
            headers: {
                'Accept-Language': 'tr',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
    }

    updateCv(cvId, cv) {
        return axios.put(Cv_API_BASE_URL + '/' + cvId, cv, {
            headers: {
                'Accept-Language': 'tr',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
    }

    deleteCv(cvId) {
        return axios.delete(Cv_API_BASE_URL + '/' + cvId, {
            headers: {
                'Accept-Language': 'tr',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
    }
}

export default new CvService()