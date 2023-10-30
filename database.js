const supaUrl = 'https://cqlueytrxqlhdvhqqyse.supabase.co'
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxbHVleXRyeHFsaGR2aHFxeXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgyNTQ5NTAsImV4cCI6MjAxMzgzMDk1MH0.Gr19SNLr2pNQFwxkHvKhK09DN-DjglQFPzbNY_p9A9o'

const database = supabase.createClient(supaUrl, supaAnonKey)

// const fetchDataFromspieler = async () => {
//     try {
//         const { data, error } = await database
//             .from('spieler')
//             .select('*')
//         if (error) {
//             throw error
//         }
//         if (data) {
//             console. log(data)
//         }
//     }
//     catch (error) {
//         console. log (error)
//     }
// }

// fetchDataFromspieler()

// const insertDataIntospieler = async (spitzname, punkte) => {
//     try {
//         const { res, error} = await database
//         .from("spieler")
//         .insert(
//             { spieler: spitzname, punktzahl: punkte},
//         )
//         .select()
//         if (error) {
//             throw error
//         }
//         if (res) {
//             console.log(res)
//         }
//     }
//     catch (error) {
//         console.log(error)
//         if (error.code == '23505' ) {
//             alert('Spitzname schon vergeben, bitte suchen einen anderen aus')
//         }
//     }
// }



const supabaseFetch = async (table, [columns]) => {
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

supabaseFetch('spieler', ['spieler'])

// const supabaseInsert = async (table, [columns], [values]) => {
//     try {
//         const {data, error} = await database
//             .from(table)
//             .insert(
//                 if (i)
//             )
//     }