const getIdFromUrl = (url) =>{

    const segments = new URL(url).pathname.split('/');
    const last = segments.pop() || segments.pop(); // Handle potential trailing slash
    return last;
    
}

export default getIdFromUrl;