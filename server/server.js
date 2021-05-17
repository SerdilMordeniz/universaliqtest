require('dotenv').config()
const express = require('express')
const cors = require('cors')
const db = require('./db')

const app = express()

app.use(cors())
app.use(express.json())

// Create an IQ Test entry in the database
app.post('/api/v1/iqtest', async(req, res) =>{
    try {
        const insert_person = await db.query('WITH insert_person AS ( INSERT INTO person (pseudonym, e_mail, gender) VALUES ($1, $2, $3) RETURNING id AS personal_id), insert_age AS ( INSERT INTO age (personal_id, age, age_category) SELECT personal_id, $4, $5 FROM insert_person RETURNING personal_id), insert_country AS ( INSERT INTO country (personal_id, ip_address, code, "name", continent_code, languages) SELECT personal_id, $6,  $7, $8, $9, $10 FROM insert_age RETURNING personal_id), insert_iq_test AS ( INSERT INTO iq_test (personal_id, total_time_taken, number_of_correct_answers, time_for_each_item, "date") SELECT personal_id, $11, $12, $13, $14 FROM insert_country RETURNING personal_id) INSERT INTO education (personal_id, study_level, study_area) SELECT personal_id, $15, $16 FROM insert_iq_test RETURNING personal_id;', 
        [req.body.pseudonym, req.body.e_mail, req.body.gender, req.body.age, req.body.age_category, req.body.ip_address,  req.body.code, req.body.name, req.body.continent_code, req.body.languages, req.body.total_time_taken, req.body.number_of_correct_answers, req.body.time_for_each_item, req.body.date, req.body.study_level, req.body.study_area]);
        res.status(201).json({
            personal_id: insert_person.rows[0]
        })
    } catch (error) {
        console.log(error)
    }
})

// Post the Percentiles to the database
app.post('/api/v1/post_percentiles', async(req, res) =>{
    try {
        const insert_percentiles = await db.query('INSERT INTO iq_info (personal_id, percentile_world_population, percentile_continent, percentile_age_category, percentile_study_level, percentile_study_area, rank_world_population, rank_continent, rank_age_category, rank_study_level, rank_study_area, number_of_rows_world_population, number_of_rows_continent, number_of_rows_age_category, number_of_rows_study_level, number_of_rows_study_area, "date") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17);', 
        [req.body.personal_id, req.body.percentile_world_population, req.body.percentile_continent, req.body.percentile_age_category, req.body.percentile_study_level, req.body.percentile_study_area, req.body.rank_world_population, req.body.rank_continent, req.body.rank_age_category, req.body.rank_study_level, req.body.rank_study_area, req.body.number_of_rows_world_population, req.body.number_of_rows_continent, req.body.number_of_rows_age_category, req.body.number_of_rows_study_level, req.body.number_of_rows_study_area, req.body.date]);
        res.status(201).json({
            personal_id: insert_percentiles.rows[0]
        })
    } catch (error) {
        console.log(error)
    }
})

// Get rank of client within the world population and number of rows (1 number, not a whole array)
app.get('/api/v1/rank/world_population', async (req, res) => {
    try {
        const rank_result = await db.query('WITH rank_world_population AS (SELECT person.id = $1 AS identification, person.id, iq_test.number_of_correct_answers, iq_test.total_time_taken, RANK() OVER ( ORDER BY iq_test.number_of_correct_answers DESC, iq_test.total_time_taken ASC) FROM   person INNER JOIN iq_test ON person.id = iq_test.personal_id) SELECT DISTINCT rank_world_population.rank FROM   rank_world_population WHERE  rank_world_population.identification = true UNION ALL select count(*) from person;',
        [req.query.personal_id])
        res.status(200).json({
            rank_world_population: rank_result.rows[0],
            number_of_rows:rank_result.rows[1]
        })
    } catch (error) {
        //console.log(error)
    }
})

// Get rank of client within the age_category and number of rows (1 number, not a whole array)
app.get('/api/v1/rank/age_category', async (req, res) => {
    try {
        const rank_result = await db.query('WITH rank_age AS (SELECT person.id = $1 AS identification, person.id, iq_test.number_of_correct_answers, iq_test.total_time_taken, age.age, RANK() OVER ( partition BY age.age_category ORDER BY iq_test.number_of_correct_answers DESC, iq_test.total_time_taken ASC) FROM   person INNER JOIN iq_test ON person.id = iq_test.personal_id INNER JOIN age ON person.id = age.personal_id WHERE  age.age_category = $2) SELECT DISTINCT rank_age.rank AS rank_age_category FROM   rank_age WHERE  rank_age.identification = true UNION ALL select count(*) from age where age_category = $2;',
        [req.query.personal_id, req.query.age_category])
        res.status(200).json({
            rank_age_category: rank_result.rows[0],
            number_of_rows:rank_result.rows[1]
        })
    } catch (error) {
        //console.log(error)
    }
})

// Get rank of client within the continent and number of rows (1 number, not a whole array)
app.get('/api/v1/rank/continent', async (req, res) => {
    try {
        const rank_result = await db.query('WITH rank_continent AS (SELECT person.id = $1 AS identification, person.id, iq_test.number_of_correct_answers, iq_test.total_time_taken, country.continent_code, RANK() OVER ( partition BY country.continent_code ORDER BY iq_test.number_of_correct_answers DESC, iq_test.total_time_taken ASC) FROM   person INNER JOIN iq_test ON person.id = iq_test.personal_id INNER JOIN country ON person.id = country.personal_id WHERE  country.continent_code = $2) SELECT DISTINCT rank_continent.rank FROM   rank_continent WHERE  rank_continent.identification = true UNION ALL select count(*) from country where country.continent_code = $2',
        [req.query.personal_id, req.query.continent_code])
        res.status(200).json({
            rank_continent: rank_result.rows[0],
            number_of_rows:rank_result.rows[1]
        })
    } catch (error) {
        //console.log(error)
    }
})

// Get rank of client within the study level and number of rows (1 number, not a whole array)
app.get('/api/v1/rank/study_level', async (req, res) => {
    try {
        const rank_result = await db.query('WITH rank_study_level AS (SELECT person.id = $1 AS identification, person.id, iq_test.number_of_correct_answers, iq_test.total_time_taken, education.study_level, RANK() OVER ( partition BY education.study_level ORDER BY iq_test.number_of_correct_answers DESC, iq_test.total_time_taken ASC) FROM   person INNER JOIN iq_test ON person.id = iq_test.personal_id INNER JOIN education ON person.id = education.personal_id WHERE  education.study_level = $2) SELECT DISTINCT rank_study_level.rank FROM rank_study_level WHERE  rank_study_level.identification = true UNION ALL select count(*) from education where education.study_level = $2;',
        [req.query.personal_id, req.query.study_level])
        res.status(200).json({
            rank_study_level: rank_result.rows[0],
            number_of_rows:rank_result.rows[1]
        })
    } catch (error) {
        //console.log(error)
    }
})

// Get rank of client within the study area and number of rows (1 number, not a whole array)
app.get('/api/v1/rank/study_area', async (req, res) => {
    try {
        const rank_result = await db.query('WITH rank_study_area AS (SELECT person.id = $1 AS identification, person.id, iq_test.number_of_correct_answers, iq_test.total_time_taken, education.study_area, RANK() OVER ( partition BY education.study_area ORDER BY iq_test.number_of_correct_answers DESC, iq_test.total_time_taken ASC) FROM person INNER JOIN iq_test ON person.id = iq_test.personal_id INNER JOIN education ON person.id = education.personal_id WHERE  education.study_area = $2) SELECT DISTINCT rank_study_area.rank FROM   rank_study_area WHERE  rank_study_area.identification = true UNION ALL select count(*) from education where education.study_area = $2;',
        [req.query.personal_id, req.query.study_area])
        res.status(200).json({
            rank_study_area: rank_result.rows[0],
            number_of_rows:rank_result.rows[1]
        })
    } catch (error) {
        //console.log(error)
    }
})

// Get the last 20 results
app.get('/api/v1/last_20_results', async (req, res) => {
    try {
        const last20resuts = await db.query("select person.pseudonym, iq_info.percentile_age_category, iq_test.number_of_correct_answers, iq_test.total_time_taken, to_char(iq_test.date,'DD.MM.YYYY HH24:MI' ), country.code from person inner join iq_info on person.id = iq_info.personal_id inner join iq_test on person.id = iq_test.personal_id inner join country on person.id = country.personal_id order by iq_test.date desc limit 20;",
        [])
        res.status(200).json({
            last_20_results: last20resuts.rows
        })
    } catch (error) {
        console.log(error)
    }
})

// Get the IQ result for an id
app.get('/api/v1/results/:id', async (req, res) => {
    try {

        const result = await db.query('select person.pseudonym, age.age, age.age_category, country.code, country.continent_code, country.name, total_time_taken, number_of_correct_answers, time_for_each_item, study_level, study_area, percentile_age_category, percentile_world_population, percentile_continent, percentile_study_level, percentile_study_area, rank_world_population, rank_continent, rank_age_category, rank_study_level, rank_study_area, number_of_rows_world_population, number_of_rows_continent, number_of_rows_age_category, number_of_rows_study_level, number_of_rows_study_area  from person inner join age on person.id = age.personal_id inner join country on person.id = country.personal_id inner join iq_test on person.id = iq_test.personal_id inner join education on person.id = education.personal_id inner join iq_info on person.id = iq_info.personal_id where id = $1;',
        [req.params.id])
        res.status(200).json({
            result: result.rows[0]
        })
    } catch (error) {
        console.log(error)
    }
})

// Get continent rank and rows (1 number, not a whole array)
app.get('/api/v1/continent_chart', async (req, res) => {
    try {
        const result = await db.query('WITH avg_continent_rank AS (SELECT Avg(iq_test.number_of_correct_answers) AS avg_continent_correct, Avg(iq_test.total_time_taken) AS avg_continent_time, country.continent_code AS code, Count(country.continent_code) AS number_of_tests_per_continent FROM   iq_test INNER JOIN country ON iq_test.personal_id = country.personal_id GROUP  BY country.continent_code) SELECT code, number_of_tests_per_continent, avg_continent_correct, avg_continent_time, Rank() OVER ( ORDER BY avg_continent_correct DESC, avg_continent_time ASC ) FROM avg_continent_rank;',
        [])
        res.status(200).json({
            number_of_rows: result.rows.length,
            result: result.rows
        })
    } catch (error) {
        console.log(error)
    }
})

// Get country rank and rows for each country
app.get('/api/v1/country_chart', async (req, res) => {
    try {
        const result = await db.query('with avg_country_rank as ( select avg(iq_test.number_of_correct_answers) as avg_country_correct, avg(iq_test.total_time_taken) as avg_country_time, country.code as code, count(country.code) as number_of_tests_per_country from iq_test inner join country on iq_test.personal_id = country.personal_id group by country.code ) select code, number_of_tests_per_country, avg_country_correct, avg_country_time, rank() over ( order by avg_country_correct desc, avg_country_time asc ) from avg_country_rank;',
        [])
        res.status(200).json({
            number_of_rows: result.rows.length,
            result: result.rows
        })
    } catch (error) {
        console.log(error)
    }
})

// Get age_category percentiles and rows for each age category
app.get('/api/v1/age_category_chart', async (req, res) => {
    try {
        const result = await db.query('with percent_ranks as ( select age.age_category, iq_test.number_of_correct_answers, iq_test.total_time_taken, PERCENT_RANK() OVER ( ORDER BY iq_test.number_of_correct_answers ASC, iq_test.total_time_taken DESC ) from age inner join iq_test on age.personal_id = iq_test.personal_id ) select percent_ranks.age_category, avg(percent_ranks.percent_rank) from percent_ranks group by percent_ranks.age_category',
        [])
        res.status(200).json({
            number_of_rows: result.rows.length,
            result: result.rows
        })
    } catch (error) {
        console.log(error)
    }
})

// Get study level percentiles and rows for each study level
app.get('/api/v1/study_level_chart', async (req, res) => {
    try {
        const result = await db.query('with percent_ranks as ( select education.study_level, iq_test.number_of_correct_answers, iq_test.total_time_taken, PERCENT_RANK() OVER ( ORDER BY iq_test.number_of_correct_answers ASC, iq_test.total_time_taken DESC ) from education inner join iq_test on education.personal_id = iq_test.personal_id ) select percent_ranks.study_level, avg(percent_ranks.percent_rank) from percent_ranks group by percent_ranks.study_level order by study_level asc;',
        [])
        res.status(200).json({
            number_of_rows: result.rows.length,
            result: result.rows
        })
    } catch (error) {
        console.log(error)
    }
})

// Get study area percentiles and rows for each study area
app.get('/api/v1/study_area_chart', async (req, res) => {
    try {
        const result = await db.query('with percent_ranks as ( select education.study_area, iq_test.number_of_correct_answers, iq_test.total_time_taken, PERCENT_RANK() OVER ( ORDER BY iq_test.number_of_correct_answers ASC, iq_test.total_time_taken DESC ) from education inner join iq_test on education.personal_id = iq_test.personal_id ) select percent_ranks.study_area, avg(percent_ranks.percent_rank) from percent_ranks group by percent_ranks.study_area order by avg desc;',
        [])
        res.status(200).json({
            number_of_rows: result.rows.length,
            result: result.rows
        })
    } catch (error) {
        console.log(error)
    }
})

// Get number of rows within the client's age_category (1 number, not a whole array)
app.get('/api/v1/tests_taken_within_country', async (req, res) => {
    try {
        const result = await db.query('select count(country.code) from country where country.code = $1;',
        [req.query.country_code])
        res.status(200).json({
            result: result.rows[0]
        })
    } catch (error) {
        console.log(error)
    }
})

// Get number of rows within the client's age_category (1 number, not a whole array)
app.get('/api/v1/number_of_rows', async (req, res) => {
    try {
        const number_of_rows_result = await db.query('select count(*) from age where age_category = $1;',
        [req.query.age_category])
        res.status(200).json({
            number_of_rows: number_of_rows_result.rows[0]
        })
    } catch (error) {
        console.log(error)
    }
})

// Get number of tests taken 
app.get('/api/v1/number_of_tests_taken', async (req, res) => {
    try {
        const number_of_tests_taken = await db.query('select count(*) from person;')
        res.status(200).json({
            number_of_tests_taken: number_of_tests_taken.rows[0]
        })
    } catch (error) {
        console.log(error)
    }
})

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
  })

const port = process.env.PORT || 3002
app.listen(port, ()=> {
    console.log('server is up and listening on port ' + port)
})