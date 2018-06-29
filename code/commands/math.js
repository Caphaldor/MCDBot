function converter(num, bi) {
    var binLength = 1;
    if (bi=="binary") {
        var outcome = 0;
        for (i=0;i<num.length;i++){
            outcome += parseInt(num.substr(i,1))*(Math.pow(2, (num.length-i-1)));
        }
    }else {
        var outcome = "";
        var comparator = parseInt(num);
        for (;Math.pow(2, binLength)<=comparator;binLength++){}
        for (i=binLength;i!=0;i--) {
            if (Math.pow(2,i-1)<=comparator) {
                outcome += "1";
                comparator -= Math.pow(2,i-1);
            } else {
                outcome += "0";
            }
        }
    }
    return outcome
}
function countOZ (bin) {
    var binLength = bin.toString().length;
    var zeros = 0;
    var ones = 0;
    for (i=0;i<binLength;i++){
        if (bin.toString().substr(i,1)== "0") {
            zeros++;
        } else if (bin.toString().substr(i,1) == "1") {
            ones++;
        }
    }
    var absZeros = zeros;
    var absOnes = ones;
    for (;(ones>3 || zeros>3)&&(ones>-1&&zeros>-1);) {
        ones = ones-3;
        zeros = zeros-3;
    }
    outcome = " (" + absZeros + " zero's, " + absOnes + " one's [" + zeros + "," + ones +"])";
    return outcome 
}
function conjecture(bin, lin, isRev) {
    var binLength = bin.length;
    outcome = -1;
    if (isRev == false) {
        if (lin == "a") {
            //Calculate how many times the "111000" sequence is repeated
            var recur = Math.ceil((binLength-1)/6);
            //Calculate what number we need to substract
            var substractor = 1;
            for (i=0;i!=recur;i++) {
                substractor += 56*Math.pow(2,(6*(i+1)-5));
            }
            //Calculate corrected bin
            var missing = (6 - (binLength-1)%6);
            var number = converter(bin, "binary");
            if (missing==6){missing=0}
            for (i=0;i<missing&&i<3;i++) {
                number += Math.pow(2,(recur*6-i))
            }
            //Calculate position of binary number in the sequence
            outcome = (number-substractor);
        } else if (lin=="b") {
            //Calculate how many times the "000111" sequence is repeated
            var recur = Math.ceil(binLength/6);
            //Calculate what number we need to substract
            var substractor = 0;
            for (i=0;i!=recur;i++) {
                substractor += 7*Math.pow(2,(6*i));
            }
            //Calculate corrected bin
            var missing = (6 - (binLength%6));
            if (missing==6){missing=0}
            var number = converter(bin, "binary");
            for (i=missing;i>3;i--) {
                number += Math.pow(2,(recur*6-i))
            }
            //Calculate position of binary number in the sequence
            outcome = (number-substractor);
        }
    } else {
        if (lin == "a") {
            bin = converter(bin+1, "");
            var loops = 0;
            do {
                binLength = bin.toString().length;
                //Calculate how many times the "111000" should be repeated
                var recur = Math.ceil((binLength-1)/6);
                //Calculate what needs to be added
                var adder = 0;
                for (;loops<recur;loops++) {
                    adder += 56*Math.pow(2,(6*loops+1));
                }
                //Add the reminder
                bin = converter(converter(bin.toString(),"binary")+adder,"");
                //check wether the number increased
            }while (binLength!=bin.toString().length);
            outcome = bin;
        } else if (lin == "b") {
            bin = converter(bin+7, "");
            var loops = 0;
            do {
                binLength = bin.toString().length;
                //Calculate how many times the "111000" should be repeated
                var recur = Math.ceil((binLength-3)/6);
                //Calculate what needs to be added
                var adder = 0;
                for (;loops<recur;loops++) {
                    adder += 56*Math.pow(2,(6*loops+3));
                }
                //Add the reminder
                bin = converter(converter(bin.toString(),"binary")+adder,"");
                //check wether the number increased
            }while (binLength!=bin.toString().length);
            outcome = bin;
        }
    }
    return outcome
}
module.exports = {
    description: "Mathematical helper for TNT",
    usage: "-math",
    allowedInDM: true,
    allowedChannels: [],
    call: function(message, args){
        var number = args[0];
        var format = "";
        var subs = 0;
        var line = args[1];
        var aLines = 0;
        var bLines = 0;
        if (line == "b") {format = "*"; subs = 1;}
        else if (line == "a") {format = "**"; subs = 5;}
        var decimal = 6*conjecture(number, line, false)-subs;
        var tester = 0;
        var steps = 0;
        if (decimal>0) {
            message.reply("Starting the process with a decimal of " + decimal);
            do {
                tester = 3*decimal+1;
                steps++;
                message.reply(format + number + countOZ(number) + format + "  =>  " + decimal + "  -->  " + tester);
                if (line=="b") {bLines++}
                else if (line=="a") {aLines++}
                for (;tester%2==0;steps++){tester = tester/2}
                decimal = tester;
                if ((decimal+1)%6==0) {format = "*"; subs = 1; line = "b";}
                else if ((decimal+5)%6==0) {format = "**"; subs = 5; line = "a";}
                number = conjecture((decimal+subs)/6, line, true);
            } while ((number != "1110010")||(line != "a"));
            message.reply(format + number + countOZ(number) + format + "  =>  " + decimal + "  -->  " + tester);
            message.reply("There was a total of " + aLines + " a lines and " + bLines + " b lines, with a total of " + steps + " steps.");
        } else {
            message.reply("The number selected is negative (" + decimal + ") not continuing with calculation");
        }
    }
};
