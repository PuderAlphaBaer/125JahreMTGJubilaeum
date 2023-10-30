const supaUrl = 'https://cqlueytrxqlhdvhqqyse.supabase.co'
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxbHVleXRyeHFsaGR2aHFxeXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgyNTQ5NTAsImV4cCI6MjAxMzgzMDk1MH0.Gr19SNLr2pNQFwxkHvKhK09DN-DjglQFPzbNY_p9A9o'
const database = supabase.createClient(supaUrl, supaAnonKey)

const supabaseFetch = async (table, columns) => {
    try {
        const { data, error } = await database
            .from(table)
            .select(columns)
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

function errorHandling (error, table) {
    if (table == 'spieler') {
        if (error.code == '23505') {
            alert('Der von Ihnen gewaehlte Spitzname ist bereits vergeben, bitte suchen Sie einen anderen aus.')
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

