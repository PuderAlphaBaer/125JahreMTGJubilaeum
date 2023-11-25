const supaUrl = 'https://cqlueytrxqlhdvhqqyse.supabase.co'
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxbHVleXRyeHFsaGR2aHFxeXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgyNTQ5NTAsImV4cCI6MjAxMzgzMDk1MH0.Gr19SNLr2pNQFwxkHvKhK09DN-DjglQFPzbNY_p9A9o'
const database = supabase.createClient(supaUrl, supaAnonKey)

function ifing(conditionType, conditionColumn, conditionValue, query) {
    if (conditionType != undefined && conditionColumn != undefined && conditionValue != undefined) {
        if (conditionType == 'eq') {
            query = query.eq(conditionColumn, conditionValue)
        }
        if (conditionType == 'neq') {
            query = query.neq(conditionColumn, conditionValue)
        }
        if (conditionType == 'gt') {
            query = query.gt(conditionColumn, conditionValue)
        }
        if (conditionType == 'lt') {
            query = query.lt(conditionColumn, conditionValue)
        }
    }
}

const supabaseFetch = async (table, columns, conditionType, conditionColumn, conditionValue, orderColumn, AscTrue) => {
    try {
        if (columns == undefined) {
            columns = '*'
        }

        let query = database
            .from(table)
            .select(columns)

        ifing(conditionType, conditionColumn, conditionValue, query)

        if (orderColumn != undefined && AscTrue != undefined) {
            query = query.order(orderColumn, { ascending: AscTrue })
        }



        const { data, error } = await query
        if (data) {
            console .log(data)
            return data
        }

        if (error) {
        throw error
        }
    }
    catch (error) {
        console.log(error)
    }
}

//a function that returns true or false if a dataset exists
const supabaseExists =  async (table, conditionType, conditionColumn, conditionValue) => {
    let query = database
        .from(table)
        .select('id')
    
    ifing(conditionType, conditionColumn, conditionValue, query)

    const { data, error } = await query

    if (await data.length > 0) {
        return true
    } else {
        return false
    }
}

const supabaseInsert = async (table, columns, values) => {
    try {
        const {data, error} = await database
            .from(table)
            .insert(
                rowFormatter(columns, values)
            )
            .select()
        if (data) {
            console.log('success inserting')
            return data;
        }
        if (error) {
            throw error
        }
    }
    catch (error) {
        console.log(error)
        errorHandling(error, table)
    }
}

const supabaseUpdate = async (table, columns, values, conditionType, conditionColumn, conditionValue) => {
    try {
        let query = database
        .from(table)
        .update(
            rowFormatter(columns, values)
        )
    
        ifing(conditionType, conditionColumn, conditionValue, query)
        const {data, error} = await query
            .select()
        if (data) {
            console.log(data)
            return data;
        }
        if (error) {
            throw error
        }
    } catch (error) {
        console.log(error)
    }
}


const supabaseDelete = async (table, conditionType, conditionColumn, conditionValue) => {
    try {
        let query = database
        .from(table)
        .delete()
    
        ifing(conditionType, conditionColumn, conditionValue, query)
        const {data, error} = await query
            .select()
        if (data) {
            console.log('success deleting')
            return data;
        }
        if (error) {
            throw error
        }
    } catch (error) {
        console.log(error)
    }
}

const supabaseDeleteAll = async (table) => {
    try {
        const {data, error} = await database
            .from(table)
            .delete()
            .neq('id', -1)
        if (data) {
            console.log('success deleting All', data)
            return data;
        }
        if (error) {
            throw error
        }
    } catch (error) {
        console.log(error)
    }
}




function errorHandling (error, table) {
    if (table == 'spieler') {
        if (error.code == '23505') {
            toggle(inputBox);
            alert('Der von Ihnen gewählte Spitzname ist bereits vergeben, bitte suchen Sie sich einen anderen aus.');
        }
    }
}
    


function rowFormatter (columns, values) {
    let row = {}
    for (let i = 0; i < columns.length; i++) {
        row[columns[i]] = values[i]
    }
    return row
}

const fragenUpdates = database.channel('fragenUpdates')
    .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'fragen' },
        (payload) => {
            console.log('fragen', payload)
            console.log(payload.new)

            questions[payload.new.id].beginn = payload.new.beginn;
            questions[payload.new.id].start = payload.new.start;
            questions[payload.new.id].ende = payload.new.ende;
            
            console.log(questions[payload.new.id])
            checkStarting();
            return payload;
        }
    )
    .subscribe()
