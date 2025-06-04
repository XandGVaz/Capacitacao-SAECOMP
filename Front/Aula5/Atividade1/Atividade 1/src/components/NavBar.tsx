interface INavBar {
    urls: string[];
}

//const urls = ['/home', '/sobre-nos', '/login'];
const NavBar = ({urls} : INavBar/*Recebe valor em props*/) => {
    return (
        <div>{
            urls.map((el, index)=> (
                <a key={index} href={el}>
                    {el}
                </a>
            ))
        }</div>
    );
}

export default NavBar;