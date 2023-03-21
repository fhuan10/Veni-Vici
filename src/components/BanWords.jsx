const BanWords = (bannedWords) => {
    return (
      <button className="BannedWordButton">{bannedWords.name}</button>
    );
  };
  
  export default BanWords;