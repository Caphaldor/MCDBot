module.exports = function (title, msg, color, thumb) {
    var colour;
	if (typeof thumb === 'undefined') { thumb = "https://i.imgur.com/rK0V3uO.png"; }
    if(color == "red"){
        colour = 0xe51400;
    }else if(color == "blue"){
        colour = 0x3333A1;
    }else if(color == "gold"){
        colour = 0xFFD700;
    }else if(color == "green"){
        colour = 0x008a00;
    }else if(color == "white"){
        //Not truly white, slightly blue so it's visible on Light settings
        colour =0xc1f1ff;
    }else if(color == "gray"){
        colour =0x808080;
    }else{
        colour = 0x333333;
    }
    return {
        title: title,
		thumbnail: {"url": thumb},
        description: msg,
        color: colour,
        type: "rich",
        footer: {
            text: "Coded by the HUD development team • [Come join our Community Discord](https://discord.gg/q4mAbPK)!"
        }
    }
};
