module.exports = function(messageObj, session, send, finished) {

  if (messageObj.ref === 'alerts') {

    var alerts = [
      {
        componentName: 'adminui-topbar-navbar-dropdown-item',
        state: {
          heading: 'December 12, 2019',
          text: 'This is your first alert',
          icon: 'exclamation-triangle',
          colour: 'warning',
          itemId: 1
        }
      },
      {
        componentName: 'adminui-topbar-navbar-dropdown-item',
        state: {
          heading: 'February 10, 2020',
          text: 'Some useful information',
          icon: 'donate',
          colour: 'success',
          itemId: 2
        }
      }
    ];

    setTimeout(function() {
      alerts.push({
        componentName: 'adminui-topbar-navbar-dropdown-item',
        state: {
          heading: 'February 25, 2020',
          text: 'Its pancake day!',
          icon: 'cog',
          colour: 'danger',
          itemId: 3
        }
      });
      send({
        ref: messageObj.ref,
        items: alerts
      });
      finished();
    }, 5000);

    send({
      ref: messageObj.ref,
      items: alerts
    });
  }

  else if (messageObj.ref === 'messages') {

    var messages = [
      {
        componentName: 'adminui-topbar-navbar-dropdown-item',
        state: {
          heading: 'December 12, 2019',
          text: 'This is your first message',
          icon: 'exclamation-triangle',
          colour: 'warning',
          itemId: 1
        }
      },
      {
        componentName: 'adminui-topbar-navbar-dropdown-item',
        state: {
          heading: 'February 10, 2020',
          text: 'A second message',
          icon: 'donate',
          colour: 'success',
          itemId: 2
        }
      }
    ];

    setTimeout(function() {
      messages.push({
        componentName: 'adminui-topbar-navbar-dropdown-item',
        state: {
          heading: 'February 25, 2020',
          text: 'A third message',
          icon: 'cog',
          colour: 'danger',
          itemId: 3
        }
      });
      send({
        ref: messageObj.ref,
        items: messages
      });
      finished();
    }, 5000);

    send({
      ref: messageObj.ref,
      items: messages
    });
  }

  else {
    finished({
      ref: messageObj.ref,
      items: []
    });
  }

};
