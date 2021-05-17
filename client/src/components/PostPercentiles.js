import React, { useEffect, useState } from 'react'
import iqTestAPI from '../apis/iqTestAPI'
import IqTestResultsPage from '../routes/IqTestResultsPage'
import { Redirect } from 'react-router-dom'

function PostPercentiles(props) {
    const [rankAgeCategory, setRankAgeCategory] = useState(0)
    const [numberOfRowsAgeCategory, setNumberOfRowsAgeCategory] = useState(0)
    const [percentileAgeCategory, setPercentileAgeCategory] = useState(0)

    const [rankWorldPopulation, setRankWorldPopulation] = useState(0)
    const [numberOfRowsWorldPopulation, setNumberOfRowsWorldPopulation] = useState(0)
    const [percentileWorldPopulation, setPercentileWorldPopulation] = useState(0)

    const [rankContinent, setRankContinent] = useState(0)
    const [numberOfRowsContinent, setNumberOfRowsContinent] = useState(0)
    const [percentileContinent, setPercentileContinent] = useState(0)

    const [rankStudyLevel, setRankStudyLevel] = useState(0)
    const [numberOfRowsStudyLevel, setNumberOfRowsStudyLevel] = useState(0)
    const [percentileStudyLevel, setPercentileStudyLevel] = useState(0)

    const [rankStudyArea, setRankStudyArea] = useState(0)
    const [numberOfRowsStudyArea, setNumberOfRowsStudyArea] = useState(0)
    const [percentileStudyArea, setPercentileStudyArea] = useState(0)

    const [status, setStatus] = useState(0)

    useEffect(() => {
        const fetchAgeCategoryRANKData = async () => {
            try {
                const response = await iqTestAPI.get('/rank/age_category', {
                    params: {
                        personal_id: props.id,
                        age_category: props.ageCategory
                    }
                })
                setRankAgeCategory(parseInt(response.data.rank_age_category.rank_age_category, 10))
                setNumberOfRowsAgeCategory(parseInt(response.data.number_of_rows.rank_age_category, 10))

            } catch (error) {
                console.log(error)
            }
        }

        const fetchWorldPopulationRANKData = async () => {
            try {
                const response = await iqTestAPI.get('/rank/world_population', {
                    params: {
                        personal_id: props.id
                    }
                })
                setRankWorldPopulation(parseInt(response.data.rank_world_population.rank, 10))
                setNumberOfRowsWorldPopulation(parseInt(response.data.number_of_rows.rank, 10))
            } catch (error) {
                console.log(error)
            }
        }

        const fetchContinentRANKData = async () => {
            try {
                const response = await iqTestAPI.get('/rank/continent', {
                    params: {
                        personal_id: props.id,
                        continent_code: props.continentCode
                    }
                })
                setRankContinent(parseInt(response.data.rank_continent.rank, 10))
                setNumberOfRowsContinent(parseInt(response.data.number_of_rows.rank, 10))

            } catch (error) {
                console.log(error)
            }
        }

        const fetchStudyLevelRANKData = async () => {
            try {
                const response = await iqTestAPI.get('/rank/study_level', {
                    params: {
                        personal_id: props.id,
                        study_level: props.studyLevel
                    }
                })
                setRankStudyLevel(parseInt(response.data.rank_study_level.rank, 10))
                setNumberOfRowsStudyLevel(parseInt(response.data.number_of_rows.rank, 10))

            } catch (error) {
                console.log(error)
            }
        }

        const fetchStudyAreaRANKData = async () => {
            try {
                const response = await iqTestAPI.get('/rank/study_area', {
                    params: {
                        personal_id: props.id,
                        study_area: props.studyArea
                    }
                })
                setRankStudyArea(parseInt(response.data.rank_study_area.rank, 10))
                setNumberOfRowsStudyArea(parseInt(response.data.number_of_rows.rank, 10))

            } catch (error) {
                console.log(error)
            }
        }

        fetchAgeCategoryRANKData()
        fetchWorldPopulationRANKData()
        fetchContinentRANKData()
        fetchStudyLevelRANKData()
        fetchStudyAreaRANKData()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (numberOfRowsAgeCategory === 1 && rankAgeCategory === 1) {
            setPercentileAgeCategory(50);
        }
        else if (rankAgeCategory === numberOfRowsAgeCategory && rankAgeCategory > 0 && numberOfRowsAgeCategory !== 1) {
            setPercentileAgeCategory(((numberOfRowsAgeCategory - rankAgeCategory + 1) / numberOfRowsAgeCategory) * 100)
        } else if (rankAgeCategory > 0 && rankAgeCategory !== numberOfRowsAgeCategory) {
            setPercentileAgeCategory(((numberOfRowsAgeCategory - rankAgeCategory) / numberOfRowsAgeCategory) * 100)
        }
    }, [rankAgeCategory, numberOfRowsAgeCategory])

    useEffect(() => {
        if (numberOfRowsContinent === 1 && rankContinent === 1) {
            setPercentileContinent(50);
        }
        else if (rankContinent === numberOfRowsContinent && rankContinent > 0 && numberOfRowsContinent !== 1) {
            setPercentileContinent(((numberOfRowsContinent - rankContinent + 1) / numberOfRowsContinent) * 100)
        } else if (rankContinent > 0 && rankContinent !== numberOfRowsContinent) {
            setPercentileContinent(((numberOfRowsContinent - rankContinent) / numberOfRowsContinent) * 100)
        }
    }, [rankContinent, numberOfRowsContinent])

    useEffect(() => {
        if (numberOfRowsStudyLevel === 1 && rankStudyLevel === 1) {
            setPercentileStudyLevel(50);
        }
        else if (rankStudyLevel === numberOfRowsStudyLevel && rankStudyLevel > 0 && numberOfRowsStudyLevel !== 1) {
            setPercentileStudyLevel(((numberOfRowsStudyLevel - rankStudyLevel + 1) / numberOfRowsStudyLevel) * 100)
        } else if (rankStudyLevel > 0 && rankStudyLevel !== numberOfRowsStudyLevel) {
            setPercentileStudyLevel(((numberOfRowsStudyLevel - rankStudyLevel) / numberOfRowsStudyLevel) * 100)
        }
    }, [rankStudyLevel, numberOfRowsStudyLevel])

    useEffect(() => {
        if (numberOfRowsWorldPopulation === 1 && rankWorldPopulation === 1) {
            setPercentileWorldPopulation(50);
        }
        else if (rankWorldPopulation === numberOfRowsWorldPopulation && rankWorldPopulation > 0 && numberOfRowsWorldPopulation !== 1) {
            setPercentileWorldPopulation(((numberOfRowsWorldPopulation - rankWorldPopulation + 1) / numberOfRowsWorldPopulation) * 100)
        } else if (rankWorldPopulation > 0 && rankWorldPopulation !== numberOfRowsWorldPopulation) {
            setPercentileWorldPopulation(((numberOfRowsWorldPopulation - rankWorldPopulation) / numberOfRowsWorldPopulation) * 100)
        }
    }, [rankWorldPopulation, numberOfRowsWorldPopulation])

    useEffect(() => {
        if (numberOfRowsStudyArea === 1 && rankStudyArea === 1) {
            setPercentileStudyArea(50);
        }
        else if (rankStudyArea === numberOfRowsStudyArea && rankStudyArea > 0 && numberOfRowsStudyArea !== 1) {
            setPercentileStudyArea(((numberOfRowsStudyArea - rankStudyArea + 1) / numberOfRowsStudyArea) * 100)
        } else if (rankStudyArea > 0 && rankStudyArea !== numberOfRowsStudyArea) {
            setPercentileStudyArea(((numberOfRowsStudyArea - rankStudyArea) / numberOfRowsStudyArea) * 100)
        }
    }, [rankStudyArea, numberOfRowsStudyArea])

    useEffect(() => {
        try {
            const postPercentiles = async () => {
                // eslint-disable-next-line
                const results = await iqTestAPI.post('/post_percentiles', {
                    personal_id: props.id,
                    percentile_world_population: percentileWorldPopulation,
                    percentile_continent: percentileContinent,
                    percentile_age_category: percentileAgeCategory,
                    percentile_study_level: percentileStudyLevel,
                    percentile_study_area: percentileStudyArea,
                    rank_world_population: rankWorldPopulation,
                    rank_continent: rankContinent,
                    rank_age_category: rankAgeCategory,
                    rank_study_level: rankStudyLevel,
                    rank_study_area: rankStudyArea,
                    number_of_rows_world_population: numberOfRowsWorldPopulation,
                    number_of_rows_continent: numberOfRowsContinent,
                    number_of_rows_age_category: numberOfRowsAgeCategory,
                    number_of_rows_study_level: numberOfRowsStudyLevel,
                    number_of_rows_study_area: numberOfRowsStudyArea,
                    date: new Date()
                })
            }
            if (percentileWorldPopulation > 0 && percentileContinent > 0 && percentileAgeCategory > 0 && percentileStudyLevel > 0 && percentileStudyArea > 0 && rankWorldPopulation > 0 && rankContinent > 0 && rankAgeCategory > 0 && rankStudyLevel > 0 && rankStudyArea > 0 && numberOfRowsWorldPopulation > 0 && numberOfRowsContinent > 0 && numberOfRowsAgeCategory > 0 && numberOfRowsStudyLevel > 0 && numberOfRowsStudyLevel > 0 && status !== 201) {
                postPercentiles()
                setStatus(201)
            }
        } catch (error) {
            console.error(error)
        }
    }, [status, numberOfRowsAgeCategory, numberOfRowsContinent, numberOfRowsStudyArea, numberOfRowsStudyLevel, numberOfRowsWorldPopulation, percentileAgeCategory, percentileContinent, percentileStudyArea, percentileStudyLevel, percentileWorldPopulation, props.id, rankAgeCategory, rankContinent, rankStudyArea, rankStudyLevel, rankWorldPopulation])

    if (status === 201) {
        return (
            <div>
                <Redirect to={`/results/${props.id}`} />
                <IqTestResultsPage id={props.id} />
            </div>
        )

    } else return (
        <div>Posting results to the database...</div>
    )
}

export default PostPercentiles
