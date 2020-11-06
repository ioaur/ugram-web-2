import { EntityManager } from "typeorm";
import { User } from "src/users/users.entity";
import { Image } from "src/images/images.entity";
import { SeedingLogEntry } from "../seeding.entity";
import { Tag } from "src/images/tags.entity";
import { ImageComment } from "src/images/imagecomments.entity";
import { UserNotification } from "src/users/usernotification.entity";

export default async (transactionalEntityManager: EntityManager): Promise<SeedingLogEntry> => {
    let user = new User();
    user.firstname = "Roméo";
    user.lastname = "Elvis";
    user.email = "bruxuelle@4zoo.io";
    user.phoneNumber = "666-666-6666";
    user.username = "orelsan";
    user.uuid = "99999999-9999-9999-9999-999999999999";
    user.googleid = "1111";
    await transactionalEntityManager.save(user);

    let profilePicture = new Image();
    profilePicture.uploadedBy = user;
    await transactionalEntityManager.save(profilePicture);

    user.profilePicture = profilePicture;
    await transactionalEntityManager.save(user);

    let firstImage = new Image();
    firstImage.description = "Une première image";
    firstImage.url =
        "https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/fc/3068655-inline-i-1-first-instagram-photo-ever.jpg";

    let tag = new Tag();
    tag.value = "doggo";
    await transactionalEntityManager.save(tag);

    firstImage.tags = [tag];
    firstImage.uploadedBy = user;
    await transactionalEntityManager.save(firstImage);

    let secondUser = new User();
    secondUser.firstname = "Stevie";
    secondUser.lastname = "Wonder";
    secondUser.email = "imblind@mira.io";
    secondUser.phoneNumber = "777-777-7777";
    secondUser.username = "5T3V13";
    secondUser.uuid = "99999999-9999-9999-9999-999999999998";
    secondUser.googleid = "1112";
    await transactionalEntityManager.save(secondUser);

    let secondProfilePicture = new Image();
    secondProfilePicture.uploadedBy = secondUser;
    await transactionalEntityManager.save(secondProfilePicture);

    secondUser.profilePicture = secondProfilePicture;
    await transactionalEntityManager.save(secondUser);

    let firstMentionnedImage = new Image();
    firstMentionnedImage.description = "Ça c'est mon vrai poto";
    firstMentionnedImage.url = "https://specials-images.forbesimg.com/imageserve/5d8bd74018444200084e889c/416x416.jpg";

    let tagFriends = new Tag();
    tagFriends.value = "friends";
    await transactionalEntityManager.save(tagFriends);

    let tagThereWeGo = new Tag();
    tagThereWeGo.value = "therewego";
    await transactionalEntityManager.save(tagThereWeGo);

    firstMentionnedImage.tags = [tagFriends, tagThereWeGo];
    firstMentionnedImage.uploadedBy = secondUser;
    firstMentionnedImage.mentionUser = user;
    firstMentionnedImage.likes = [user];

    let comment = new ImageComment();
    comment.user = user;
    comment.message = "Commentaire pertinent";

    firstMentionnedImage.comments = [comment];
    await transactionalEntityManager.save(firstMentionnedImage);

    let notification = new UserNotification();
    notification.seen = false;
    notification.message = "LIKE";
    notification.user = secondUser;
    notification.relatedUser = user;
    notification.image = firstMentionnedImage;
    await transactionalEntityManager.save(notification);

    return transactionalEntityManager.save(new SeedingLogEntry("initial-seeding"));
};
