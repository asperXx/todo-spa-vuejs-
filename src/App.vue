<template>
  <div id="app">
    <div id="nav">
      <font-awesome-icon icon="dragon" :style="{ color: 'white' }" size="2x" />
      <ul class="nav-area">
        <router-link to="/"
          ><li><a>Список заметок</a></li></router-link
        >
        <router-link to="/create"
          ><li><a>Создать заметку</a></li></router-link
        >
      </ul>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#nav {
  background-color: #039be5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 0px 0px 5px;
  font-weight: 500;
  font-size: 16px;
}
.nav-area {
  list-style: none;

  li {
    padding: 15px 15px;
    margin: 0px 0px;
    display: inline-block;
    text-transform: uppercase;
    height: 100%;
    color: #fff;
    a {
      text-decoration: none;
    }
  }
  li:hover {
    background-color: #10affc;
    color: #f3f3f3;
  }
}
// Кастомизация Checkbox
.custom-checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.custom-checkbox + label {
  display: inline-flex;
  align-items: center;
  user-select: none;
}
.custom-checkbox + label::before {
  content: "";
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #adb5bd;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}
.custom-checkbox:checked + label::before {
  border-color: #0b76ef;
  background-color: #0b76ef;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}
/* стили при наведении курсора на checkbox */
.custom-checkbox:not(:disabled):not(:checked) + label:hover::before {
  border-color: #b3d7ff;
}

/* стили для чекбокса, находящегося в фокусе */
.custom-checkbox:focus + label::before {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
/* стили для чекбокса, находящегося в фокусе и не находящегося в состоянии checked */
.custom-checkbox:focus:not(:checked) + label::before {
  border-color: #80bdff;
}
/* стили для чекбокса, находящегося в состоянии disabled */
.custom-checkbox:disabled + label::before {
  background-color: #e9ecef;
}

.taskList {
  list-style: none;
  width: 100%;
  label {
    width: 100%;
  }
}

.cardNote {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  padding: 15px 30px;
  margin-top: 20px;
  word-break: break-all;
  max-width: 900px;
  min-width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
}
.buttons {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 5px ;
}
// Стилизация кнопок
.btn {
-moz-box-shadow:inset 0px 1px 0px 0px #ffffff;
	-webkit-box-shadow:inset 0px 1px 0px 0px #ffffff;
	box-shadow:inset 0px 1px 0px 0px #ffffff;
	background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #ffffff), color-stop(1, #f6f6f6) );
	background:-moz-linear-gradient( center top, #ffffff 5%, #f6f6f6 100% );
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#f6f6f6');
	background-color:#ffffff;
	-webkit-border-top-left-radius:6px;
	-moz-border-radius-topleft:6px;
	border-top-left-radius:6px;
	-webkit-border-top-right-radius:6px;
	-moz-border-radius-topright:6px;
	border-top-right-radius:6px;
	-webkit-border-bottom-right-radius:6px;
	-moz-border-radius-bottomright:6px;
	border-bottom-right-radius:6px;
	-webkit-border-bottom-left-radius:6px;
	-moz-border-radius-bottomleft:6px;
	border-bottom-left-radius:6px;
text-indent:0;
	border:1px solid #dcdcdc;
	display:inline-block;
	color:#666666;
	font-family:arial;
	font-size:15px;
	font-weight:bold;
	font-style:normal;
height:50px;
	line-height:50px;
width:140px;
	text-decoration:none;
	text-align:center;
	text-shadow:0px 1px 0px #ffffff;
}.btn:hover {
	background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #f6f6f6), color-stop(1, #ffffff) );
	background:-moz-linear-gradient( center top, #f6f6f6 5%, #ffffff 100% );
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#f6f6f6', endColorstr='#ffffff');
	background-color:#f6f6f6;
}.btn:active {
	position:relative;
	top:1px;
}

.taskPoint {
    margin-top: 20px;
    display: flex;
}
</style>
