import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { User, Username, UserView } from '../services/user.dto';
import Chatkit from '@pusher/chatkit-client';
import axios from 'axios';

@Component({
  selector: 'app-sellermessage',
  templateUrl: './sellermessage.component.html',
  styleUrls: ['./sellermessage.component.scss']
})
export class SellermessageComponent {
  flag = 1;
  userDetails : UserService[];
  userId : String;
  searchedSellerId : any;
  currentUser = <any>{};
  messages = [];
  currentRoom = <any>{};
  roomUsers = [];
  userRooms = [];
  newMessage = '';
  newRoom = {
    name: '',
    isPrivate: false
  };
  joinableRooms = [];
  newUser = '';

  constructor (private userService : UserService, private messageService : MessageService){
    //  this.userId = "testing_user_three";
     this.searchedSellerId = localStorage.getItem('searched_user');
     this.userId = localStorage.getItem('user_name');
     const innerMessage = '____to____';
     this.newRoom.name = this.userId.concat(innerMessage,this.searchedSellerId);
     this.newRoom.isPrivate = true;
     this.addUser(localStorage.getItem('searched_user'));
     this.addUser(localStorage.getItem('user_name'));
     this.newUser = this.searchedSellerId;
    //  this.createRoom();
    //  this.getJoinableRooms();
    
  }

  addUserToRoom() {

    const { currentUser, currentRoom } = this;
    this.newUser = this.searchedSellerId;

    currentUser.addUserToRoom({
      userId: this.searchedSellerId,
      roomId: currentRoom.id
    })
      .then((currentRoom) => {
        this.roomUsers = currentRoom.users;
      })
      .catch(err => {
        console.log(`Error adding user: ${err}`);
      });

    this.newUser = '';
    this.flag = 0;
  }

      createRoom() {
        const { newRoom: { name, isPrivate }, currentUser, currentRoom } = this;


        // console.log(currentUser.name);

        // console.log("type : " + typeof this.newRoom.name + " value is : " + this.newRoom.name);
        // console.log("type : " + typeof this.newRoom.isPrivate + " value is : " + this.newRoom.isPrivate);
        // console.log("type : " + typeof this.currentUser + " value is : " + this.currentUser);

        if (name.trim() === '') return;
    
        currentUser.createRoom({
          name,
          private: true,
        }).then(room => {
          this.connectToRoom(room.id);
          this.newRoom = {
            name: '',
            isPrivate: false,
          };
        })
        .catch(err => {
          console.log(`Error creating room ${err}`)
        });

        this.newUser = '';
      }

  getJoinableRooms() {
    const { currentUser } = this;
    currentUser.getJoinableRooms()
    .then(rooms => {
      this.joinableRooms = rooms;
    })
    .catch(err => {
      console.log(`Error getting joinable rooms: ${err}`)
    })
  }

  joinRoom(id) {
    const { currentUser } = this;
    currentUser.joinRoom({ roomId: id })
    .catch(err => {
      console.log(`Error joining room ${id}: ${err}`)
    })
  }

  connectToRoom(id) {
    this.messages = [];
    const { currentUser } = this;
    
    currentUser.subscribeToRoom({
      roomId: `${id}`,
      messageLimit: 100,
      hooks: {
        onMessage: message => {
          this.messages.push(message);
        },
        onPresenceChanged: () => {
          this.roomUsers = this.currentRoom.users.sort((a) => {
            if (a.presence.state === 'online') return -1;

            return 1;
          });
        },
      },
    })
    .then(currentRoom => {
      this.currentRoom = currentRoom;
      this.roomUsers = currentRoom.users;
      this.userRooms = currentUser.rooms;
    });
  }

  sendMessage() {
    const { newMessage, currentUser, currentRoom } = this;
    
    if (newMessage.trim() === '') return;

    currentUser.sendMessage({
      text: newMessage,
      roomId: `${currentRoom.id}`,
    });

    this.newMessage = '';
  }

  // addUser(user_Id) {
  //   const curr_user = user_Id;
  //   console.log(user_Id);
  //   axios.post('http://localhost:5000/users', {curr_user})
  //     .then(() => {
  //       const tokenProvider = new Chatkit.TokenProvider({
  //         url: 'http://localhost:5000/authenticate'
  //       });

  //       const chatManager = new Chatkit.ChatManager({
  //         instanceLocator: 'v1:us1:4480233d-785c-4a07-b65b-e1dcd8b84830',
  //         curr_user,
  //         tokenProvider
  //       });

  //       return chatManager
  //         .connect({
  //           onAddedToRoom: room => {
  //             console.log(`Added to room ${room.name}`)
  //             this.userRooms.push(room);
  //             this.getJoinableRooms();
  //           },
  //         })
  //         .then(currentUser => {
  //           this.currentUser = currentUser;
  //           this.connectToRoom('9d9396b1-3d4a-4b6a-903b-57ad09b70214');
  //           this.getJoinableRooms();
  //         });
  //     })
  //       .catch(error => console.error(error))
  // }

  addUser(userName : String) {
    const userId = userName;
    axios.post('http://localhost:5000/users', {userId})
      .then(() => {
        const tokenProvider = new Chatkit.TokenProvider({
          url: 'http://localhost:5000/authenticate'
        });

        const chatManager = new Chatkit.ChatManager({
          instanceLocator: 'v1:us1:4480233d-785c-4a07-b65b-e1dcd8b84830',
          userId,
          tokenProvider
        });

        return chatManager
          .connect({
            onAddedToRoom: room => {
              console.log(`Added to room ${room.name}`)
              this.userRooms.push(room);
              this.getJoinableRooms();
            },
          })
          .then(currentUser => {
            this.currentUser = currentUser;
            this.connectToRoom('8bff1151-0660-438e-81a4-c7276f887137');
            this.getJoinableRooms();
          });
      })
        .catch(error => console.error(error))
  }
}
