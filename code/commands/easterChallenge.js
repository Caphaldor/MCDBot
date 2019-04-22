module.exports = {
    description: "Command used to guess the Easter challenge.",
    usage: "-guess {guess}",
    allowedInDM: true,
    allowedChannels: [],
    call: function(message, args){
        switch (args.join(' ').toLowerCase()) {
            case "splegg" :
                message.reply("*There was hardly anyone there, apparently the shift ended early due to some 'company holiday policy'. At least old Benny was around, he was a top notch informant back in the day but, well... Anyway, he said pops went down to the watering hole after work, so I figured that was my next stop*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 1", "green");
            break;
            case "cai saloon" :
                message.reply("*Obviously he had to have went to the local saloon, so I went and asked around if anyone saw him. Clinton behind the bar said pops came in for a quick pair of shots before leaving, supposedly worried - seems the old coot may have been hiding something, because after all the time in Los Lapinos, I've learned to trust Clinton. But as good as he was reading faces, he could not say where my father went. I had to widen my search, checking out the nearby places.*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 2", "green");
            break;
            case "cai bank" :
                message.reply("*Of all the possibilities, the bank seemed the most obvious. It was close, and James behind the counter always kept an eye out for suspicious activity. What a surprise it was to find his son there instead. Fella had a tendency for speeches. Long, watered down speeches. He was taking forever. Or perhaps it was just me? Time stretches out with some people, but I could've swore I spent over an hour listening to the young chap.*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 3", "green");
            break;
            case "broken clock" :
                message.reply("*\"'kay, enough of this. Get to the point: where did he go?\" I hurried him after I got tired of waiting.\n\"Well the ol' crank came in here drunk as a skunk, spillin' his drink everywhere. I couldn't do nothing to kick him out, but he withdrew a whole loada money and left on 'is own. Last I saw he tottered off 'round the corner.\"\nWhere could he have gone? The road lead outside of the town, and I only could think of one place where he could've went to spend all the cash.*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 4", "green");
            break;
            case "the farm" :
                message.reply("*All those girls at The Farm... nothin' but trouble, but they sure knew their way around. I knew a few of the more rowdy ones from my days in the force, so I started with them. It was Lola that came through eventually, tellin' me she saw pops come by a couple nights ago.\n\"I don't usually see him in here at all, so he didn't stay long. Ran by me yelling about... about... aw, shucks, I  wrote it down somewhere, I'm sure of it! Don't know what it meant though.\"*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 5", "green");
            break;
            case "woof woof" :
                message.reply("*Before she could keep talking and drag me into paying for something unsavoury, I took a look in the immediate vicinity and found 'woof woof' scrawled on a wall nearby. I didn't know what it meant at first but in a town mostly populated by rabbits, I soon realised there was only one canine around.*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 6", "green");
            break;
            case "priest" :
                message.reply("*Understandably, the only wolf around for miles was the priest - A town figure we could trust despite an unnecessary amount of very sharp teeth... Anyway, I went to see him immediately but he wouldn't give me anything good, spouting that he couldn't in good conscience share any information. Maybe it was just my gut or the sword leaning against the altar jukebox, but he knew more than he was lettin' on, so I decided to stick around and find out what. He left not too long after I'd said my goodbyes and ducked behind a pew so I took a look around the church while I was alone. Surprisingly, nothing else seemed out of the ordinary so, when he came back eating a honey sandwich, I made my escape and decided to check the local area instead.\n\nEventually, I found an ironic sight given I'd just come from The Farm...but what could a priest possibly need with these?*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 7", "green");
            break;
            case "bows and hoes" :
                message.reply("*Looking around the room I didn't see anything else out of place so I decided to follow up on the bows and hoes laying around. They're pretty common items around here, but the both of them together? Only one place I could think of. A few clues were laying around when I got there but obviously it was too good to be true and a lock stood in the way of me and the final clue. It seemed like a dead end but this was my pops at stake, I had to figure out how to get in and I wasn't gonna leave until I did.*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 8", "green");
            break;
            case "brbw" :
                message.reply("*Lockpicking isn't exactly my forte, so thankfully I figured out the combination with a little bit of sleuthing. I always was a good detective but I couldn't have been prepared for what was down in that basement. It was...money. Lots and lots of money.\n\"Oh, pops... what did you get yourself into?\" I remember asking myself as I tried to work out my next move. Despite the amount of cash, there wasn't much else down there to go off so I decided to look at the priest again. If he was involved, he had to have had help from someone...*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 9", "green");
            break;
            case "goldfangl14" :
                message.reply("🛑\n*Perhaps the flower shop owner could be a part of it. After using my contacts in the police department to look him up, we got nothing. And by nothing I mean nothing in the slightest. Where did we go wrong?*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " stepped into a dead end", "red");
            break;
            case "unigold" :
                message.reply("*Eventually, after a few ideas hit the wall, I made my way to the public records office. The flower shop owner had to have been involved, but there was only so much the police would be able to do since I'd left the force. I'd have to find out who he was on my own. After combing through way too many records, I found that the owner had changed his name not too long ago. Not just that, but I discovered he was a part of some small company based in the area? As if the name change and basement full of money wasn't suspicious enough.*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 10.", "green");
            break;
            case "team nectar" :
                message.reply("*Team Nectar didn't really seem like a company name but that wasn't the only suspicious thing. As hard as I looked, nothing seemed to indicate what the company was for or even where it started. All I found was a list of members so, running out of other options, I decided to check out their leaders. Thankfully, it was getting late and I assumed both of them would be asleep, the darkness providing me the cover I needed to break in... It was a reckless action, but I'm glad I did it because I found something in both homes that I could use. I just needed to figure out the login.*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 11.", "green");
            break;
            case "la vie en rose" :
                message.reply("*There were some random notes around with sayings and phrases on them that were too random not to be used for something. Eventually, one of them got me into a computer and, a few encrypted files later, I managed to find some sort of communication platform. It took a while to navigate since no one really used Skybe anymore, but I managed to find the location of a meeting happening tonight. If I hurried, I could make it in time to see what they were planning.*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 12.", "green");
            break;
            case "tim's science lab" :
                message.reply("*Of course, all the members would be at the meeting so I wasn't careful about checking their houses for anything suspicious. A secret lab stood out on it's own let alone one shut tight with an electronic lock. I remember seeing shadows moving through the gaps in the door but my hearing wasn't so great even back then. I had to hurry if I wanted to listen in, so I retraced my steps in search of the code.*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 13.", "green");
            break;
            case "1876" :
                message.reply("*The French phrase from earlier lingered in my mind, so I tried the only other French clue nearby and...voila. I crept down into the lab as quietly as possible, hiding around the corner to listen. I didn't dare peek but it sounded like the whole of Team Nectar was there. Just like I'd suspected, money was the topic of conversation. It sounded like they were hiding something, but they started rounding off before I could hear anymore. I just about made it out and hid as they went their separate ways. It wasn't rocket science where they were hiding things, or maybe it was, but I was always damn good at my job. I knew I was hot on their trail and it didn't take long to figure out what else that code was good for.*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 14.", "green");
            break;
            case "the lab door" :
                message.reply("*How lucky that Team Nectar seemed to know nothing about password security. The code got me into the back of the town's lab but despite the predictability of the login, I couldn't have guessed what I'd find in there. Right by a tunnel leading to who knows where was an enormous machine, covered in huge metal sheets and large, spiral cones. It took me a moment before I realized what I was looking at.*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 15.", "green");
            break;
            case "the lab keypad" :
                message.reply("*How lucky that Team Nectar seemed to know nothing about password security. The code got me into the back of the town's lab but despite the predictability of the login, I couldn't have guessed what I'd find in there. Right by a tunnel leading to who knows where was an enormous machine, covered in huge metal sheets and large, spiral cones. It took me a moment before I realized what I was looking at.*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 15.", "green");
            break;
            case "a giant drill" :
                message.reply("*Evil labs can't be expected to make sense and this one certainly didn't, but the giant drill explained where the money came from. Sadly as ecstatic as I was from figuring out this conspiracy, the discovery brought me no closer in figuring out where my pops disappeared to. Looking around the lab, I spotted what must've been their meeting table. On it a big piece of paper with some poor quality graphic decorations for the plan:\n```\nBiggest Money Yet!\nQuartz - 11$\nSea Lantern - 42$\nGold - 80$\n```\nThere were some calculations, leading to a mindblowing amount of cash.*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 16.", "green");
            break;
            case "2634" :
                message.reply("*Knowing how much money they made didn't help me though. I wanted to look for more clues when I heard footsteps at the door.\n\"You know, you really need to clean that lab Tim.\"\n\"Oh please, it's not that bad, Tim.\"\n\"It literally has radioactive waste spilling out of containers.\"\n\"A little glow never hurt nobody.\"\n\"What about old man Johnson? \"\n\"Ahh I'm sure the old coot's fine, we shot him up with somethin' to clear out the radiation.\"\n\"Yeah, after letting him get away...\"\nAs soon as I heard them mention my dad, I knew I was closer than ever. He was right there, I almost had him. But at least he managed to get away before they hurt him, I just had to catch up.*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 17.", "green");
            break;
            case "$2634" :
                message.reply("*Knowing how much money they made didn't help me though. I wanted to look for more clues when I heard footsteps at the door.\n\"You know, you really need to clean that lab Tim.\"\n\"Oh please, it's not that bad, Tim.\"\n\"It literally has radioactive waste spilling out of containers.\"\n\"A little glow never hurt nobody.\"\n\"What about old man Johnson? \"\n\"Ahh I'm sure the old coot's fine, we shot him up with somethin' to clear out the radiation.\"\n\"Yeah, after letting him get away...\"\nAs soon as I heard them mention my dad, I knew I was closer than ever. He was right there, I almost had him. But at least he managed to get away before they hurt him, I just had to catch up.*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 17.", "green");
            break;
            case "2634$" :
                message.reply("*Knowing how much money they made didn't help me though. I wanted to look for more clues when I heard footsteps at the door.\n\"You know, you really need to clean that lab Tim.\"\n\"Oh please, it's not that bad, Tim.\"\n\"It literally has radioactive waste spilling out of containers.\"\n\"A little glow never hurt nobody.\"\n\"What about old man Johnson? \"\n\"Ahh I'm sure the old coot's fine, we shot him up with somethin' to clear out the radiation.\"\n\"Yeah, after letting him get away...\"\nAs soon as I heard them mention my dad, I knew I was closer than ever. He was right there, I almost had him. But at least he managed to get away before they hurt him, I just had to catch up.*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 17.", "green");
            break;
            case "tunnel" :
                message.reply("*Needless to say, the tunnels were the only place he could've gone, what with the entrance being locked. I wasn't sure how he'd even managed to end up here in the first place, but there'd be plenty of time to ask once I found him. I followed the tunnel to a few dead ends before finally finding one that led to more money than I've ever seen. Crates of gold and diamonds were all around the gaping hole in the wall of the bank's vault, and that wasn't even all the cash that was inside. I couldn't let them get away with it, but finding pops was more important. Luckily, he hadn't made it far. I found him right by the light of day at the tunnel's winding exit. Finally.*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 18.", "green");
            break;
            case "x:-7,y:52,z:-44" :
                message.reply("*Even though he'd only been gone for a day, it felt like a lifetime and I couldn't be happier to see him despite the stink of alcohol and sweat. He looked like he'd had a rough night but I wasn't finished yet, I couldn't let Team Nectar get away. I sent our location off the cops and stayed with pops until they arrived to take him home and investigate the tunnels. I coulda let them do their job but something told me that it wouldn't be that easy. That no good crew of crooks had to have heard the sirens, they'd know that we were onto them. They were probably already making their escape, but luckily I knew how.*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 19.", "green");
            break;
            case "hot air balloon" :
                message.reply("*Earlier on when I'd been investigating their homes, I'd noticed a hot air balloon in the field nearby. It wasn't uncommon to see them floating around during the day, but one sitting by a Team Nectar neighbourhood couldn't have been a coincidence. I tried to catch up, I did but... I couldn't, I didn't make it. Suddenly I felt like I was leaving the force again, forced to quit because of some stupid... I felt like I was back at the beginning again. I hadn't even caught them. But at least pops was safe, that was what mattered. Team Nectar wouldn't get away with it forever.*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 20.", "green");
            break;
            case "did i betray the force? did i use lola's services? did i work alongside benny, the informant in los lapinos where i learnt to trust clinton? find out next episode" :
                message.reply("`Epilogue`\n*Yeah no, this isn't the actual answer but I had to make this joke.*");
                logging.log(message.author.username + " challenge progress.", message.author.username + " solved step 20.", "green");
            break;
            case "i took a bullet to the knee" :
                message.reply("`Epilogue`\n*It's been years since Team Nectar disappeared, yet ma still can't move past it. She got gramps back just fine, but letting a group of criminals like that get away? As an ex-cop it eats her alive and she still blames herself for it. It wasn't her fault, she did plenty by stopping that bank robbery! But nothing I say helps, so now it's up to me. I've been looking through all the files on Team Nectar ever since I got accepted onto the force and for a while I got her frustration. There was nothing, just dead ends and radio silence. Then suddenly, out of nowhere, they came back... And this time they're not getting away. I'll find them, ma. I promise.*\n`To be continued...`");
                logging.log(message.author.username + " solved the Easter puzzle! ", message.author.username + " did it! <@155963500265603072> <@133256750567522306>", "green");
                bot.channels.get("269176484248289280").sendMessage("<@" + message.author.id + "> solved the Easter Puzzle! Congratulations!")
                .catch(function () {
                    console.log("Error in posting to the channel.");
                });
            break;
            default:
                message.reply("That's not it, try again.");
                logging.log("Failed guess by " + message.author.username, "They tried:\n" + args.join(' '), "red");
            break;
        }
    }
};
