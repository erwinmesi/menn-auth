const getContent = resetPasswordLink => `<h1>Reset Password</h1>

<h4>Hello, Good day!</h4>
<p>To reset your password, follow the link bellow:</p>
<p>
  <strong><a href="${resetPasswordLink}">${resetPasswordLink}</a></strong>
</p>
<p>If this is a mistake and you're not the one who requested this, no action is needed.</p>
<p>Thanks! Have a great day!</p>`;

module.exports = { getContent };
