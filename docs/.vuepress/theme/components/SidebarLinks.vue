<template>
  <ul v-if="items.length" class="sidebar-links">
    <li v-for="(item, index) in items" :key="index">
      <!-- This will hide the contents added in hidden section of the nav. -->
      <div v-if="item.title === 'Hidden'">
      </div>
      <div v-else>
        <SidebarGroup
          v-if="item.type === 'group'"
          :item="item"
          :open="index === openGroupIndex"
          :depth="depth"
          @toggle="toggleGroup(index)"
        />
        <SidebarLink v-else :item="item" />
      </div>
    </li>
  </ul>
</template>

<script src="./SidebarLinks" />
