const UserFactory = (name) => ({
    name,
  });
  
const GameFactory = (user_id, duration_sec) => ({
    user_id,
    duration_sec,
})

export {
    UserFactory,
    GameFactory,
}