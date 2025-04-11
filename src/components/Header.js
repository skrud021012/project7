const nickname = useSelector((state) => state.user.nickname);

<span>👤 닉네임: {nickname || "?"}</span>
