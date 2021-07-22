import React, { useState, useEffect } from 'react'
import axios from 'axios'
import iqTestAPI from '../apis/iqTestAPI'
import IqTestResultsPage from '../routes/IqTestResultsPage'
import { Redirect, useLocation   } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function Formular(props) {
    const [t, i18n] = useTranslation()
    const [formRef] = useState(React.createRef());

    const [id, setId] = useState(0)

    const [pseudonym, setPseudonym] = useState("");
    const [e_mail, setE_mail] = useState("");
    const [gender, setGender] = useState("");

    const [ageYear, setAgeYear] = useState();
    const [currentYear] = useState(new Date().getFullYear())
    const [age, setAge] = useState()

    const [ageCategory, setAgeCategories] = useState("")

    const [ip, setIp] = useState("")
    const [countryCode, setCountryCode] = useState("")
    const [countryName, setCountryName] = useState("")
    const [continentCode, setContinentCode] = useState("")
    const [languages, setLanguages] = useState("")


    const [studyLevel, setStudyLevel] = useState("");
    const [studyArea, setStudyArea] = useState("");

    useEffect(() => {
        props.nextItem()
        props.measureItemTime()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const calculateAgeCategory = () => {
        if (12 <= age && age <= 18) {
            setAgeCategories('Youth')

        } else if (19 <= age && age <= 35) {
            setAgeCategories('Young Adult')

        } else if (36 <= age && age <= 65) {
            setAgeCategories('Adult')

        } else if (66 <= age && age <= 100) {
            setAgeCategories('Senior')
        }
    }

    useEffect(() => {
        setAge(currentYear - ageYear);
    }, [age, ageYear, currentYear])

    useEffect(() => {
        calculateAgeCategory()
    })

    useEffect(() => {
        try {

            const getGeoInfo = async () => {
                const response = await axios.get('http://api.ipapi.com/check?access_key=919b8e15d3142223683599008d66db22')
                let data = response.data;
                setCountryName(data.country_name)
                setCountryCode(data.country_code)
                setContinentCode(data.continent_code)
                setLanguages(data.location.languages[0].code)
                setIp(data.ip)
            }
            getGeoInfo()
        } catch (error) {
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formRef.current.reportValidity()) {
            try {
                const results = await iqTestAPI.post('/iqtest', {
                    pseudonym: pseudonym,
                    e_mail: e_mail,
                    gender: gender,

                    age: age,
                    age_category: ageCategory,

                    ip_address: ip,
                    code: countryCode,
                    name: countryName,
                    continent_code: continentCode,
                    languages: languages,

                    total_time_taken: props.elapsed,
                    number_of_correct_answers: props.correctAnswers,
                    time_for_each_item: props.timeForItem,
                    date: new Date(),

                    study_level: studyLevel,
                    study_area: studyArea
                })
                setId(results.data.personal_id.personal_id)
            } catch (error) {
            }
        }
    }

    const handleAge = (event) => {
        setAgeYear(parseInt(event.target.value), 10)
    }

    let location = useLocation().pathname
    useEffect(() => {
        if(location.substring(0,9) ==='/results/' ) {
            window.location.reload();
        }
    })

    if (id > 0) {
        return (
            <div>
                <Redirect to={`/${i18n.language}/results/${id}`} />
                    <IqTestResultsPage key={Math.floor(Math.random()*100)} />
            </div>
        )
    } else {

        return (
            <div className="formular">
                <img className="diamond" alt="Diamond approved" src="/diamond.svg" />
                <form ref={formRef} className="shrink">
                    <h1 className="mr-4 mt-2">{t('formular.title')}</h1>
                    <div className="form-group">
                        <label className="mt-1" htmlFor='pseudonym'>{t('formular.nickname')}</label>
                        <input className="form-control form-control-sm" maxLength="15" type='text' value={pseudonym} onChange={(e) => setPseudonym(e.target.value)} id="pseudonym" name='pseudonym' required />

                        <label className="mt-2" htmlFor='email' >{t('formular.email')}</label>
                        <input className="form-control form-control-sm" type='email' value={e_mail} onChange={(e) => setE_mail(e.target.value)} id="email" name='email' required />
                        <small id="emailHelp" className="form-text text-muted">{t('formular.small')}</small>

                        <label className="mt-3" htmlFor='gender'>{t('formular.gender')}</label>
                        <select className="form-control form-control-sm heightControl" name='gender' id='gender' value={gender} onChange={(e) => setGender(e.target.value)} required>
                            <option value="" hidden >{t('formular.select4')}</option>
                            <option value='male'>{t('formular.male')}</option>
                            <option value='female'>{t('formular.female')}</option>
                        </select>

                        <label className="mt-2" htmlFor="birth-year" >{t('formular.birthYear')}</label>
                        <select className="form-control form-control-sm" name="birth-year" id='birth-year' value={ageYear} onChange={(e) => handleAge(e)} required >
                            <option value="" hidden >{t('formular.select1')}</option>
                            <option value="2009">2009</option>
                            <option value="2008">2008</option>
                            <option value="2007">2007</option>
                            <option value="2006">2006</option>
                            <option value="2005">2005</option>
                            <option value="2004">2004</option>
                            <option value="2003">2003</option>
                            <option value="2002">2002</option>
                            <option value="2001">2001</option>
                            <option value="2000">2000</option>
                            <option value="1999">1999</option>
                            <option value="1998">1998</option>
                            <option value="1997">1997</option>
                            <option value="1996">1996</option>
                            <option value="1995">1995</option>
                            <option value="1994">1994</option>
                            <option value="1993">1993</option>
                            <option value="1992">1992</option>
                            <option value="1991">1991</option>
                            <option value="1990">1990</option>
                            <option value="1989">1989</option>
                            <option value="1988">1988</option>
                            <option value="1987">1987</option>
                            <option value="1986">1986</option>
                            <option value="1985">1985</option>
                            <option value="1984">1984</option>
                            <option value="1983">1983</option>
                            <option value="1982">1982</option>
                            <option value="1981">1981</option>
                            <option value="1980">1980</option>
                            <option value="1979">1979</option>
                            <option value="1978">1978</option>
                            <option value="1977">1977</option>
                            <option value="1976">1976</option>
                            <option value="1975">1975</option>
                            <option value="1974">1974</option>
                            <option value="1973">1973</option>
                            <option value="1972">1972</option>
                            <option value="1971">1971</option>
                            <option value="1970">1970</option>
                            <option value="1969">1969</option>
                            <option value="1968">1968</option>
                            <option value="1967">1967</option>
                            <option value="1966">1966</option>
                            <option value="1965">1965</option>
                            <option value="1964">1964</option>
                            <option value="1963">1963</option>
                            <option value="1962">1962</option>
                            <option value="1961">1961</option>
                            <option value="1960">1960</option>
                            <option value="1959">1959</option>
                            <option value="1958">1958</option>
                            <option value="1957">1957</option>
                            <option value="1956">1956</option>
                            <option value="1955">1955</option>
                            <option value="1954">1954</option>
                            <option value="1953">1953</option>
                            <option value="1952">1952</option>
                            <option value="1951">1951</option>
                            <option value="1950">1950</option>
                            <option value="1949">1949</option>
                            <option value="1948">1948</option>
                            <option value="1947">1947</option>
                            <option value="1946">1946</option>
                            <option value="1945">1945</option>
                            <option value="1944">1944</option>
                            <option value="1943">1943</option>
                            <option value="1942">1942</option>
                            <option value="1941">1941</option>
                            <option value="1940">1940</option>
                            <option value="1939">1939</option>
                            <option value="1938">1938</option>
                            <option value="1937">1937</option>
                            <option value="1936">1936</option>
                            <option value="1935">1935</option>
                            <option value="1934">1934</option>
                            <option value="1933">1933</option>
                            <option value="1932">1932</option>
                            <option value="1931">1931</option>
                            <option value="1930">1930</option>
                            <option value="1929">1929</option>
                            <option value="1928">1928</option>
                            <option value="1927">1927</option>
                            <option value="1926">1926</option>
                            <option value="1925">1925</option>
                            <option value="1924">1924</option>
                            <option value="1923">1923</option>
                            <option value="1922">1922</option>
                            <option value="1921">1921</option>
                        </select>

                        <label className="mt-2" htmlFor='study_level' >{t('formular.studyLevel')}</label>
                        <select className="form-control form-control-sm" name='study_level' id='study_level' value={studyLevel} onChange={(e) => setStudyLevel(e.target.value)} required>
                            <option value="" hidden >{t('formular.select2')}</option>
                            <option value="No diploma">{t('formular.levelOp1')}</option>
                            <option value='High School'>{t('formular.levelOp2')}</option>
                            <option value='2 years graduation'>{t('formular.levelOp3')}</option>
                            <option value='3 years graduation'>{t('formular.levelOp4')}</option>
                            <option value='4 years graduation'>{t('formular.levelOp5')}</option>
                            <option value='5 years graduation'>{t('formular.levelOp6')}</option>
                            <option value='More Than 5 years graduation'>{t('formular.levelOp7')}</option>
                        </select>

                        <label className="mt-2" htmlFor='study_area' >{t('formular.studyArea')}</label>
                        <select className="form-control form-control-sm" name='study_area' id='study_area' value={studyArea} onChange={(e) => setStudyArea(e.target.value)} required>
                            <option value="" hidden >{t('formular.select3')}</option>
                            <option value="No diploma">{t('formular.areaOp1')}</option>
                            <option value="" disabled >{t('formular.label1')}</option>
                            <option value='Performing Arts'>{t('formular.areaOp2')}</option>
                            <option value='Visual Arts'>{t('formular.areaOp3')}</option>
                            <option value='History'>{t('formular.areaOp4')}</option>
                            <option value='Languages and Literature'>{t('formular.areaOp5')}</option>
                            <option value='Law'>{t('formular.areaOp6')}</option>
                            <option value='Philosophy'>{t('formular.areaOp7')}</option>
                            <option value='Theology'>{t('formular.areaOp8')}</option>
                            <option value="" disabled >{t('formular.label2')}</option>
                            <option value='Anthropology'>{t('formular.areaOp9')}</option>
                            <option value='Economics'>{t('formular.areaOp10')}</option>
                            <option value='Geography'>{t('formular.areaOp11')}</option>
                            <option value='Political Science'>{t('formular.areaOp12')}</option>
                            <option value='Psychology'>{t('formular.areaOp13')}</option>
                            <option value='Sociology'>{t('formular.areaOp14')}</option>
                            <option value='Social Work'>{t('formular.areaOp15')}</option>
                            <option value="" disabled >{t('formular.label3')}</option>
                            <option value='Biology'>{t('formular.areaOp16')}</option>
                            <option value='Chemistry'>{t('formular.areaOp17')}</option>
                            <option value='Earth Science'>{t('formular.areaOp18')}</option>
                            <option value='Space Sciences'>{t('formular.areaOp19')}</option>
                            <option value='Physics'>{t('formular.areaOp20')}</option>
                            <option value="" disabled >{t('formular.label4')}</option>
                            <option value='Computer Science'>{t('formular.areaOp21')}</option>
                            <option value='Mathematics'>{t('formular.areaOp22')}</option>
                            <option value="" disabled >{t('formular.label5')}</option>
                            <option value='Business'>{t('formular.areaOp23')}</option>
                            <option value='Engineering and Technology'>{t('formular.areaOp24')}</option>
                            <option value='Medicine and Health'>{t('formular.areaOp25')}</option>
                        </select>
                        <div className="text-center">
                            <input className="mt-3 btn" type="submit" value={t('formular.submit')} onClick={handleSubmit} />
                        </div>
                    </div>
                </form>
            </div>

        )
    }
}

export default Formular