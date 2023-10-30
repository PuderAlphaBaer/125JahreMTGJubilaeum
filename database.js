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

const insertDataIntospieler = async (spitzname, punkte) => {
    try {
        const { res, error} = await supaClient
        .from("spieler")
        .insert(
            { spieler: spitzname, punktzahl: punkte},
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
        if (error.code == '23505' ) {
            alert('Spitzname schon vergeben, bitte suchen einen anderen aus')
        }
    }
}


// const supabaseFetch = async (table, [columns], [where]) => {
//     try {
//         const { data, error } = await supaClient
//             .from(table)
//             .select(columns)
//             .eq(where)
//         if (error) {
//             throw error
//         }

//     }
// }
const initRealtime = async () => {
    try {
        const { data: initialData, error } = await supaClient
            .from('spieler')
            .select('*');

        if (initialData) {
            console.log('initial data:', initialData);
        }

        if (error) {
            throw error;
        }

        const realtime = supaClient
            .from('spieler')
            .on('*', payload => {
                console.log('Change received:', payload.new); // Ensure that the payload contains the 'new' property for insert and update events
            })
            .subscribe();
    } catch (error) {
        console.error('Error:', error.message);
    }
};

initRealtime();

