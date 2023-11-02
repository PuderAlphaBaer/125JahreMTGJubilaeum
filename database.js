const supaUrl = 'https://cqlueytrxqlhdvhqqyse.supabase.co'
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxbHVleXRyeHFsaGR2aHFxeXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgyNTQ5NTAsImV4cCI6MjAxMzgzMDk1MH0.Gr19SNLr2pNQFwxkHvKhK09DN-DjglQFPzbNY_p9A9o'
const database = supabase.createClient(supaUrl, supaAnonKey)

const supabaseFetch = async (table, columns, conditionColumn, conditionValue, orderColumn, AscTrue) => {
    try {
        if (conditionColumn == undefined) {
            conditionColumn = ''
            conditionValue = ''
        }
        if (conditionValue == undefined) {
            conditionValue = ''
            conditionColumn = ''
        }
        if (columns == undefined) {
            columns = '*'
        }
        if (orderColumn == undefined) {
            orderColumn = 'id'
        }
        if (AscTrue == undefined) {
            AscTrue = true
        }

        const { data, error } = await database
            .from(table)
            .select(columns)
            .eq(conditionColumn, conditionValue)
            .order(orderColumn, { ascending: AscTrue })
        if (data) {
            console.log('success fetching', data)
        }
        if (error) {
        throw error
        }
    }
    catch (error) {
        console.log(error)
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
            console.log('success inserting', data)
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

const supabaseUpdate = async (table, columns, values, conditionColumn, conditionValue) => {
    try {
        const {data, error} = await database
            .from(table)
            .update(
                rowFormatter(columns, values)
            )
            .eq(conditionColumn, conditionValue)
            .select()
        if (data) {
            console.log('success updating', data)
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
            alert('Der von Ihnen gewählte Spitzname ist bereits vergeben, bitte suchen Sie sich einen anderen aus.')
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

