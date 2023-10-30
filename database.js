const { createClient } = supabase;

const supaUrl = 'https://cqlueytrxqlhdvhqqyse.supabase.co'
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxbHVleXRyeHFsaGR2aHFxeXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgyNTQ5NTAsImV4cCI6MjAxMzgzMDk1MH0.Gr19SNLr2pNQFwxkHvKhK09DN-DjglQFPzbNY_p9A9o'

const supaClient = createClient(supaUrl, supaAnonKey)

const fetchDataFromspieler = async () => {
    try {
        const { data, error } = await supaClient
            .from('spieler')
            .select('*')
        if (error) {
            throw error
        }
        if (data) {
            console. log(data)
        }
    }
    catch (error) {
        console. log (error)
    }
}

fetchDataFromspieler()

const insertDataIntospieler = async () => {
    try {
        const { res, error} = await supaClient
        .from("spieler")
        .insert(
            { spieler: randomInt(1, 89), punktzahl: randomInt(1, 1000)},
        )
        if (error) {
            throw error
        }
        if (res) {
            console.log(res)
        }
    }
    catch (error) {
        console.log(error)
    }
}

insertDataIntospieler()

function randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}