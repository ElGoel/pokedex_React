const NotFound = () => {


  return (
    <div className="not__found">
        <h1 className="not__found--title">¡Oops!</h1>
        <p className="not__found--massage">it seems I couldn't find any match with your search, you might want to try it again with a different name or number</p>
        <img className="not__found--img" src="https://i.pinimg.com/originals/89/4c/4f/894c4fa15ddf231530f3f272ada404d3.png" alt="img pikachu" />
    </div>
  )
}

export default NotFound