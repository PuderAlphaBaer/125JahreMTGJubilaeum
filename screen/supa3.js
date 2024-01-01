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
            questions[payload.new.id].auswertung = payload.new.auswertung;

            console.log(questions[payload.new.id])
        
            checkStarting();
            return payload;
        }
    )
    .subscribe()
