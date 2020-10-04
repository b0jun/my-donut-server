module.exports =  (req, res) => {
    res.cookie('authType', 'oauth');
    res.redirect(`http://localhost:3000`);
}
