const userUpdates = database.channel('userUpdates')
    // realtime connection listens to new inserts
    .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'spieler' },
        (payload) => {
            console.log('user', payload)
            console.log(payload.new)

            addUser(payload.new);

            return payload;
        }
    )
    .subscribe()
